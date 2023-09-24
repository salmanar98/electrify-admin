import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authData: null,
};

const User = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.authData = action.payload;
    },
  },
});

export const { setAuthData } = User.actions;

export default User.reducer;
