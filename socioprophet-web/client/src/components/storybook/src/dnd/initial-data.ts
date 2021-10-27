const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'News' },
    'task-2': { id: 'task-2', content: 'Research' },
    'task-3': { id: 'task-3', content: 'Social' },
    'task-4': { id: 'task-4', content: 'Projects' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: <any>['task-3'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: <any>['task-4'],
    },
  },

  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
