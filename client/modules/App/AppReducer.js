// Import Actions
import { TOGGLE_ADD_TASK } from './AppActions';

// Initial State
const initialState = {
  showAddTask: false,
  // token: null,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_TASK:
      return {
        showAddTask: !state.showAddTask,
      };

    // case SET_TOKEN:
    //   return {
    //     token: action.token,
    //   };

    default:
      return state;
  }
};

/* Selectors */
export const getShowAddTask = state => state.app.showAddTask;
// export const getToken = state => state.app.token;

// Export Reducer
export default AppReducer;
