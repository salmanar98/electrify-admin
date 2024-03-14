import axios from 'src/utils/axios';
import { errorToast, successToast } from 'src/shared/Toast';
import { setHideBeatLoader, setShowBeatLoader } from 'src/reducers/slices/AlertsSlice';
import { paginationFormator } from './AdminApiCalls';
import { dispatch } from 'src/reducers/configureStore';
const adminFormatter = (admins) => {
  return {
    id: admins.id,
    company_name: admins.company_name,
    phone_number: admins.phone_number,
    email: admins.email,
    is_active: admins.is_active ? true : false,
    state: admins.state?.name,
    stateData: admins.state,
    // state_id: admins.state?.id,
    city: admins.city?.name,
    cityData: admins.city,
    // city_id: admins.city?.id,
    country: admins.country?.name,
    countryData: { label: admins.country?.name, value: admins.country?.id },
    // country_id: admins.country?.id,
    logo: {
      url: admins?.company_logo?.full_path,
      file: null,
    },
  };
};

const adminsFormatter = (admins) => {
  return admins.map((admin) => adminFormatter(admin));
};
export const createPartner = async (values) => {
  const formDataPayload = new FormData();
  formDataPayload.append('company_name', values.companyName);
  formDataPayload.append('email', values.companyEmail);
  formDataPayload.append('phone_number', values.companyPhone);
  formDataPayload.append('type', 4);
  formDataPayload.append('state_id', values.state);
  formDataPayload.append('is_active', values.is_active);
  formDataPayload.append('country_id', values.country);
  formDataPayload.append('city_id', values.city);
  if (values.logo?.file) {
    formDataPayload.append('logo', values.logo?.file);
  }
  try {
    const { data } = await axios.post('/api/service-partners/', formDataPayload, {
      rawRequest: true,
      headers: 'multipart/form-data',
    });

    if (data?.status) {
      successToast(data.message);
      return true;
    } else {
      errorToast(data.message);
    }
  } catch (error) {
    console.log('error', error);
    errorToast('Something went wrong!');
  }
};

export const ListPartners = async (params) => {
  const body = {
    ...params,
  };
  try {
    dispatch(setShowBeatLoader());
    const { data } = await axios.post('/api/service-partners/listing', body);
    if (data?.status) {
      return {
        ...paginationFormator(data),
        data: adminsFormatter(data.data) ?? [],
      };
    } else {
      errorToast(data.message);
    }
  } catch (error) {
    errorToast('Listing failed');

    console.error('Listing failer failed', error);
  } finally {
    dispatch(setHideBeatLoader());
  }
};

export const deletePartner = async (values) => {
  try {
    dispatch(setShowBeatLoader());
    const { data } = await axios.delete(`/api/service-partners/${values}`);

    if (data?.status) {
      successToast(data.message);
      return true;
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

export const editPartner = async (values, id) => {
  const formDataPayload = new FormData();
  formDataPayload.append('id', id);
  formDataPayload.append('company_name', values.companyName);
  formDataPayload.append('email', values.companyEmail);
  formDataPayload.append('phone_number', values.companyPhone);
  formDataPayload.append('type', 4);
  formDataPayload.append('state_id', values.state);
  formDataPayload.append('is_active', values.is_active);
  formDataPayload.append('country_id', values.country);
  formDataPayload.append('city_id', values.city);
  if (values.logo?.file) {
    formDataPayload.append('logo', values.logo?.file);
  }

  try {
    const { data } = await axios.put('/api/service-partners/', formDataPayload, {
      rawRequest: true,
      headers: 'multipart/form-data',
    });

    if (data?.status) {
      successToast(data.message);
      return true;
    } else {
      errorToast(data.message);
    }
  } catch (error) {
    console.log('error', error);
    errorToast('Something went wrong!');
  }
};

export const getStates = async (values) => {
  try {
    dispatch(setShowBeatLoader());
    const { data } = await axios.get('/api/data/get-states/');

    if (data?.status) {
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
export const getCities = async (values) => {
  try {
    dispatch(setShowBeatLoader());
    const { data } = await axios.get(`/api/data/get-cities/${values}`);

    if (data?.status) {
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
