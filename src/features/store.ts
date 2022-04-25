import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import userListReducer from './userListSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    userlist: userListReducer
  },
});

export type AppState = ReturnType<typeof store.getState>
// export type AppDispatch = ReturnType<typeof store.dispatch>
export default store;
