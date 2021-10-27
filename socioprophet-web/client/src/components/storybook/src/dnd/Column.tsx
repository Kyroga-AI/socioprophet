import React, { Fragment } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import './scss/dnd.scss';

interface ColumnProps {
  column: any;
  tasks: any;
  top: boolean;
}

interface InnerListProps {
  tasks: any;
  position: 'top' | 'bottom';
}

const InnerList = React.memo(({ tasks, position }: InnerListProps) => {
  return tasks.map((task: any, index: any) => (
    <Task key={task.id} task={task} index={index} heightClass={position} />
  ));
});

const Column: React.FC<ColumnProps> = ({ column, tasks, top }: ColumnProps): JSX.Element => {
  return (
    <Fragment>
      {top ? (
        <div className="column__top">
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <div className="task__list" ref={provided.innerRef} {...provided.droppableProps}>
                <InnerList tasks={tasks} position={'top'} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ) : (
        <div className="column">
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <div className="task__list" ref={provided.innerRef} {...provided.droppableProps}>
                <InnerList tasks={tasks} position={'bottom'} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Fragment>
  );
};

export default Column;
