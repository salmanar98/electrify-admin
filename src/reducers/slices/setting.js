import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settingData: null,
};

const setting = createSlice({
  name: 'settingSlice',
  initialState,
  reducers: {
    setSettingData: (state, action) => {
      state.settingData = action.payload;
    },
  },
});

export const { setSettingData } = setting.actions;

export default setting.reducer;
