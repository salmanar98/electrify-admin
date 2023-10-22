import axios from 'src/utils/axios';
import { dispatch } from 'src/reducers/configureStore';
import { errorToast, successToast } from 'src/shared/Toast';
import { setHideBeatLoader, setShowBeatLoader } from 'src/reducers/slices/AlertsSlice';

export const forgetpassword = async (email) => {
  try {
    dispatch(setShowBeatLoader());
    const { data } = await axios.post('/forgot-password', email);
    if (data?.status) {
      successToast(data.message);
      return true;
    } else {
      errorToast(data?.message);
    }
  } catch (error) {
    errorToast('operation Failed');
    console.error('Listing failer failed', error);
  } finally {
    dispatch(setHideBeatLoader());
  }
};
export const verifyOtp = async (otp) => {
  const body = {
    otp: parseInt(otp),
  };
  try {
    dispatch(setShowBeatLoader());
    const { data } = await axios.post('/verify-otp', body);

    if (data?.status) {
      successToast(data.message);
      return data;
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
export const updatePassword = async (values) => {
  try {
    dispatch(setShowBeatLoader());
    const { data } = await axios.post('/recover-password/', values);
    if (data?.status) {
      return true;
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
