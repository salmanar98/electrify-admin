import { dispatch } from 'src/reducers/configureStore';
import { setHideBeatLoader, setShowBeatLoader } from 'src/reducers/slices/AlertsSlice';
import axios from '../utils/axios';
import { errorToast, successToast } from 'src/shared/Toast';

export const TechnicalDataListing = async () => {
  try {
    dispatch(setShowBeatLoader());
    const { data } = await axios.get('/api/data/get-device-models-all');
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

export const TechnicalDataUpdate = async (values) => {
  const payload = {
    id: values.modelNumber,
    battery_capacity: values.batteryCapacity,
    continous_output_power: values.continuousOutputPower,
    ac_surge: values.acSurge,
    recomended_num_of_circuits_or_devices: values.recommendedCircuitsDevices,
    operating_environment: values.operatingEnvironment,
    operating_temperature: values.operatingTemperature,
    approvals: values.approvals,
    limited_warranty: values.limitedWarranty,
  };
  dispatch(setShowBeatLoader());
  try {
    const { data } = await axios.put('/api/settings/model', payload);
    if (data?.status) {
      successToast(data.message);
      return data.data;
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
