import { createStore } from 'redux';

const SET_USER = 'SET_USER';

export const setUser = (userData) => ({
  type: SET_USER,
  payload: userData,
});

const initialState = {
  user: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
