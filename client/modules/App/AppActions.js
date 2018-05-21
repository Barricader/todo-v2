// Export Constants
export const TOGGLE_ADD_TASK = 'TOGGLE_ADD_TASK';
export const SET_TOKEN = 'SET_TOKEN';

// Export Actions
export function toggleAddTask() {
  return {
    type: TOGGLE_ADD_TASK,
  };
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}
