import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column';
import './scss/dnd.scss';

export interface Props {
  column: any;
  taskMap: any;
  top?: boolean;
}

const InnerList = React.memo(
  ({ column, taskMap, top = false }: Props): JSX.Element => {
    const tasks: any = column.taskIds.map((taskId: any) => taskMap[taskId]);
    return <Column column={column} tasks={tasks} top={top} />;
  },
);

export const Dnd = (): JSX.Element => {
  const [data, setData] = useState(initialData);
  const [isFull, setIsFull] = useState(true);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // if the user 'exited' the drag operation
    if (!destination) {
      return;
    }

    // if the user picked up an item and dropped back in the same exact position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // retrive data for task
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    // if draggable was dropped in the same droppable column - ordering needs to take place
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
      return;
    }

    // check if the only draggable item was removed from top 'hero' row and update state
    if (result.source.droppableId === 'column-3') {
      setIsFull(false);
    }

    // check if there is already item in 'hero' row and update state
    if (result.destination.droppableId === 'column-3') {
      if (isFull) {
        return;
      }
      setIsFull(true);
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];

          if (column.id === 'column-3') {
            return (
              <div className="container__innerList-top" key={column.id}>
                <InnerList key={column.id} column={column} taskMap={data.tasks} top={true} />
              </div>
            );
          } else {
            return (
              <div className="container__innerList" key={column.id}>
                <InnerList key={column.id} column={column} taskMap={data.tasks} />
              </div>
            );
          }
        })}
      </div>
    </DragDropContext>
  );
};
