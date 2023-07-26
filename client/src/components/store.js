import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
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

const persistConfig = {
  key: 'root', // La chiave sotto cui verrà memorizzato lo stato persistito
  storage, // Specifica lo storage da utilizzare
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
