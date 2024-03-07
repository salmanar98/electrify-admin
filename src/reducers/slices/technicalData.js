import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  technicalData: null,
};

const technical = createSlice({
  name: 'technicalSlice',
  initialState,
  reducers: {
    setTechnicalData: (state, action) => {
      state.technicalData = action.payload;
    },
  },
});

export const { setTechnicalData } = technical.actions;

export default technical.reducer;
