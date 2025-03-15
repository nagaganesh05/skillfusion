
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [],
};

const MeetingSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    setToasts: (state, action) => {
      state.toasts = action.payload;
    },
    addToast: (state, action) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { setToasts, addToast, removeToast, clearToasts } = MeetingSlice.actions;
export default MeetingSlice.reducer; 
