import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/features/users/userSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
