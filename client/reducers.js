/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import tasks from './modules/Task/TaskReducer';
import users from './modules/User/UserReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  tasks,
  users,
});
