import axios from 'src/utils/axios';
import { dispatch } from 'src/reducers/configureStore';
// import { setAuthData } from 'src/reducers/slices/AuthSLice';
import { errorToast, successToast } from 'src/shared/Toast';
import { setHideBeatLoader, setShowBeatLoader } from 'src/reducers/slices/AlertsSlice';
//import { setShowBeatLoader, setHideBeatLoader } from 'app/reducers/slices/AlertsSlice';
export const UserType = {
  SUPERADMIN: 1,
  COMPANY_ADMIN: 2,
  STANDARD_USER: 3,
  PRIMARY_ADMIN: 4,
};

const adminFormatter = (admin) => {
  return {
    id: admin.id,
    first_name: admin.first_name,
    last_name: admin.last_name,
    email: admin.email,
    type:
      admin.type === UserType.STANDARD_USER
        ? 'Standard User'
        : admin.type === UserType.PRIMARY_ADMIN
        ? 'Primary Admin'
        : null,
    access_level: admin.type,
    is_active: admin.is_active === true ? 'active' : 'inactive',
    active_status: admin.is_active,
  };
};

const adminsFormatter = (admins) => {
  return admins.map((admin) => adminFormatter(admin));
};
export const createAdmin = async (values) => {
  const payload = {
    first_name: values.firstName,
    last_name: values.lastName,
    email: values.email,
    password: values.password,
    password_confirmation: values.confirmPassword,
    is_active: values.isActive,
    type: values.accessLevel,
  };
  try {
    const { data } = await axios.post('/api/users/', payload);

    if (data?.status) {
      successToast(data.message);
      return true;
    } else {
      errorToast(data.errors[0].message);
    }
  } catch (error) {
    console.log('error', error);
    errorToast('Something went wrong!');
  }
};

export const ListAdmins = async (params) => {
  const body = {
    ...params,
  };

  try {
    dispatch(setShowBeatLoader());
    const { data } = await axios.post('/api/users/listing', body);
    if (data?.status) {
      return {
        ...paginationFormator(data),
        data: adminsFormatter(data.data) ?? [],
      };
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

export const deleteUser = async (userId) => {
  try {
    dispatch(setShowBeatLoader());
    const response = await axios.delete(`/api/users/${userId}`);
    if (response?.data?.status) {
      successToast(response?.data?.message ?? 'Script Deleted Successfully');
      return true;
    } else {
      errorToast(response?.data?.message);
    }
  } catch (e) {
    console.error(e);
    errorToast('An error occurred while deleting the script');
  } finally {
    dispatch(setHideBeatLoader());
  }
};

export const editAdmin = async (values, id) => {
  const payload = {
    id: id,
    first_name: values.firstName,
    last_name: values.lastName,
    email: values.email,
    password: values.password,
    password_confirmation: values.confirmPassword,
    is_active: values.isActive,
    type: values.accessLevel.toString(),
  };
  try {
    const { data } = await axios.put('/api/users/admin', payload);
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

export const paginationFormator = (data) => {
  return {
    totalPages: data?.total_page_count ?? 1,
    currentPage: data?.page ?? 1,
    pageSize: data?.page_size ?? 10,
  };
};
