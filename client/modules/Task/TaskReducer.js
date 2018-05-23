import { ADD_TASK, ADD_TASKS, DELETE_TASK, UPDATE_TASK } from './TaskActions';

// Initial State
const initialState = { data: [] };

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        data: [action.task, ...state.data],
      };

    case ADD_TASKS:
      return {
        data: action.tasks,
      };

    case DELETE_TASK:
      return {
        data: state.data.filter(task => task.cuid !== action.cuid),
      };

    case UPDATE_TASK:
      return {
        data: state.data.map(task => {
          return task.cuid === action.task.cuid ? action.task : task;
        }), // Replace updated task and return array
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

// Get task by username
export const getTasksByUsername = (state, username) => state.tasks.data.filter(task => task.username === username);

// Export Reducer
export default TaskReducer;
