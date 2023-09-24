import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  beatLoader: 0,
};

export const AlertsSlice = createSlice({
  name: 'AlertsSlice',
  initialState,
  reducers: {
    setShowBeatLoader: (state) => {
      state.beatLoader += 1;
    },
    setHideBeatLoader: (state) => {
      state.beatLoader -= 1;
    },
  },
});

export const { setShowBeatLoader, setHideBeatLoader } = AlertsSlice.actions;

export default AlertsSlice.reducer;
