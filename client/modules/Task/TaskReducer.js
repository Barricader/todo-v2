import { ADD_TASK, ADD_TASKS, DELETE_TASK } from './TaskActions';

// Initial State
const initialState = { data: [] };

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK :
      return {
        data: [action.task, ...state.data],
      };

    case ADD_TASKS :
      return {
        data: action.tasks,
      };

    case DELETE_TASK :
      return {
        data: state.data.filter(task => task.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all tasks
export const getTasks = state => state.tasks.data;

// Get task by cuid
export const getTask = (state, cuid) => state.tasks.data.filter(task => task.cuid === cuid)[0];

// Export Reducer
export default TaskReducer;
