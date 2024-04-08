import { dispatch } from 'src/reducers/configureStore';
import { setHideBeatLoader, setShowBeatLoader } from 'src/reducers/slices/AlertsSlice';
import axios from '../utils/axios';
import { errorToast, successToast } from 'src/shared/Toast';

export const SettingsDataListing = async () => {
  try {
    dispatch(setShowBeatLoader());
    const { data } = await axios.get('/api/settings/');
    if (data?.status) {
      return data?.data;
    } else {
      errorToast(data?.message);
    }
  } catch (error) {
    errorToast('Listing failed');
    console.error('Listing failer failed', error);
  } finally {
    dispatch(setHideBeatLoader());
  }
};

export const SettingsDataUpdate = async (values, id) => {
  const payload = {
    id: id,
    notify_when_battery_is: values.batteryNotify,
    notify_when_battery_state_change: values.stateChangeNotify,
  };
  dispatch(setShowBeatLoader());
  try {
    const { data } = await axios.put('/api/settings/', payload);
    if (data?.status) {
      successToast(data.message);
      return data?.data;
    } else {
      errorToast(data.message);
    }
  } catch (error) {
    console.log('error', error);
    errorToast('Something went wrong!');
  } finally {
    dispatch(setHideBeatLoader());
  }
};
