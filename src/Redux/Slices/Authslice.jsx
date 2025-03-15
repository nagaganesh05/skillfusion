// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  userInfo: undefined,
  isDarkTheme: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.isDarkTheme = action.payload.isDarkTheme;
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUser, changeTheme } = authSlice.actions;
export default authSlice.reducer;
