import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
// import './scss/dnd.scss';

const TaskWrapper = styled.div<{ heightClass: string }>`
  border: 1px solid #070708;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  display: flex;
  height: ${(props) => (props.heightClass === 'top' ? '100px' : '50px')};
`;

interface Props {
  task: any;
  index: any;
  heightClass: 'top' | 'bottom';
}
const Task: React.FC<Props> = ({ task, index, heightClass }: Props): JSX.Element => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <TaskWrapper
          heightClass={heightClass}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </TaskWrapper>
      )}
    </Draggable>
  );
};

export default Task;
