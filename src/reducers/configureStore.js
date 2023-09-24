import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSLice';
import AlertsSlice from './slices/AlertsSlice';
import setting from './slices/setting';
import technicalData from './slices/technicalData';
const store = configureStore({
  reducer: combineReducers({
    Auth: AuthSlice,
    Alerts: AlertsSlice,
    technical: technicalData,
    setting,
  }),
});

export const { dispatch, getState } = store;

export default store;
