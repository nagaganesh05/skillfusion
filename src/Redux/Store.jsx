import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/Authslice';
import MeetingSlice from './Slices/MeetingSlice'; 

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    meetings: MeetingSlice,
  },
});



