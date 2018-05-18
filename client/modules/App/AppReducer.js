// Import Actions
import { TOGGLE_ADD_TASK } from './AppActions';

// Initial State
const initialState = {
  showAddTask: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_TASK:
      return {
        showAddTask: !state.showAddTask,
      };

    default:
      return state;
  }
};

/* Selectors */
export const getShowAddTask = state => state.app.showAddTask;

// Export Reducer
export default AppReducer;
