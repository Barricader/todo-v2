import { ADD_USER, ADD_USERS, DELETE_USER, UPDATE_USER, SIGN_IN } from './UserActions';

// Initial State
const initialState = { data: [], token: null };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        data: [action.user, ...state.data],
      };

    case ADD_USERS:
      return {
        data: action.users,
      };

    case DELETE_USER:
      return {
        data: state.data.filter(user => user.cuid !== action.cuid),
      };

    case UPDATE_USER:
      return {
        data: state.data.map(user => {
          return user.cuid === action.user.cuid ? action.user : user;
        }), // Replace updated user and return array
      };

    case SIGN_IN:
      return {
        token: action.value,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all users
export const getUsers = state => state.users.data;

// Get user by cuid
export const getUser = (state, cuid) => state.users.data.filter(user => user.cuid === cuid)[0];

// Get token
export const getToken = state => state.users.token;

// Export Reducer
export default UserReducer;
