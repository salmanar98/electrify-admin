import axios from 'src/utils/axios';
import { dispatch } from 'src/reducers/configureStore';
import { setAuthData } from 'src/reducers/slices/AuthSLice';
import { errorToast, successToast } from 'src/shared/Toast';
import moment from 'moment';
import { paginationFormator } from './AdminApiCalls';
import { setHideBeatLoader, setShowBeatLoader } from 'src/reducers/slices/AlertsSlice';

const systemFormatter = (system) => {
  return {
    id: system.id,
    email: system.email,
    deviceName: system.userDevice?.name ?? '-',
    serialNumber: system.serial_number ?? '-',
    servicePartner: system.service_partner_id,
    servicePartnerData: system.service_partner,
    customerName: system.name,
    modelNumber: system.model?.model_number ?? '-',
    wifiModuleAddress: system.userDevice?.address ?? '-',
    MACAddress: system.mac_address ?? '-',
    activationDate: system.userDevice?.created_at
      ? moment(system.userDevice.created_at).format('MM-DD-YYYY')
      : '-',
    uploadDate: system.created_at ? moment(system.created_at).format('MM-DD-YYYY HH:mm:ss') : '-',
    batteryStatus: system.battery_status,
    inputVoltage: system.ups_battery_voltage,
    inputFaultVoltage: system.ups_input_fault_voltage,
    outputVoltage: system.ups_output_voltage,
    outputCurrent: system.ups_output_current,
    batteryVoltage: system.ups_battery_voltage,
    temperature: system.ups_temperature,
    utilityFail: system.ups_status_utility_fail,
    batteryLow: system.ups_status_battery_low,
    upsFailed: system.ups_status_ups_failed,
    servicePartnerName: system.service_partner?.company_name ?? '-',
    modelData: system?.model ?? null,
    upsInputVoltage: system.ups_input_voltage,
    outputFrequency: system.ups_input_frequency,
    firstName: system.userDevice?.user?.first_name ?? '-',
    lastName: system.userDevice?.user?.last_name ?? '-',
    systemStatus:
      system.battery_status === 'UPS_NORMAL'
        ? 'Normal'
        : system.battery_status === 'UPS_ON_BATTERY'
        ? 'On Battery'
        : system.battery_status === 'UPS_OFFLINE'
        ? 'Offline'
        : '-',
    batteryCapacity: system.model?.battery_capacity ?? '-',
  };
};

const systemsFormatter = (systems) => {
  return systems.map((system) => systemFormatter(system));
};

export const createSystem = async (values) => {
  const payload = {
    serial_number: values.serialNumber,
    mac_address: values.macAddress,
    model_number_id: values.modelNumber,
    // model_number_id: 1,
    service_partner_id: values.authorizedPartner.id,
  };
  try {
    const { data } = await axios.post('/api/device/', payload);

    if (data?.status) {
      successToast(data.message);
      return true;
    } else {
      if (data.errors) {
        errorToast(data.errors[0].message);
      } else {
        errorToast(data.message);
      }
    }
  } catch (error) {
    console.log('error', error);
    errorToast('Something went wrong!');
  }
};

export const ListSystems = async (params) => {
  const body = {
    ...params,
  };
  try {
    dispatch(setShowBeatLoader());
    const { data } = await axios.post('api/device/listing', body);
    if (data?.status) {
      return {
        ...paginationFormator(data),
        data: systemsFormatter(data.data) ?? [],
      };
    } else {
      console.error('Listing failer failed');
    }
  } catch (error) {
    console.error('Listing failer failed', error);
  } finally {
    dispatch(setHideBeatLoader());
  }
};

export const deleteSystem = async (systemID) => {
  try {
    dispatch(setShowBeatLoader());
    const response = await axios.delete(`/api/device/${systemID}`);
    if (response?.data?.status) {
      successToast(response?.data?.message ?? 'Device Deleted Successfully');
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

export const editSystem = async (values, systemID) => {
  const payload = {
    serial_number: values.serialNumber,
    mac_address: values.macAddress,
    model_number: values.modelNumber,
    service_partner_id: values.authorizedPartner.id,
  };
  try {
    const { data } = await axios.put(`/api/device/${systemID}`, payload);

    if (data?.status) {
      dispatch(setAuthData(data?.data));
      successToast(data.message);
      return true;
    } else {
      if (data.errors) {
        errorToast(data.errors[0].message);
      } else {
        errorToast(data.message);
      }
    }
  } catch (error) {
    console.log('error', error);
    errorToast('Something went wrong!');
  }
};

export const viewSystem = async (params) => {
  let payload = {
    page: params.page,
    page_size: params.page_size,
    type: params.type,
    filters: [
      {
        column_name: 'device_id',
        value: params.systemID,
        type: 'exact',
      },
    ],
    sort: [
      {
        column_name: 'created_at',
        order_by: 'desc',
      },
    ],
  };
  if (params.dateFilter?.endDate && params.dateFilter?.startDate) {
    payload.filters.push({
      column_name: 'created_at',
      startDate: params.dateFilter.startDate,
      endDate: params.dateFilter.endDate,
      type: 'exact',
    });
  }

  try {
    dispatch(setShowBeatLoader());
    const response = await axios.post(`/api/device-telemetry/listing`, payload);
    if (response.headers['content-disposition']) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const filename = response.headers['content-disposition']
        .split(';')
        .find((n) => n.includes('filename='))
        .replace('filename=', '')
        .trim();
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return true;
    }
    const data = response.data;
    if (data?.status) {
      return {
        ...paginationFormator(data),
        data: systemsFormatter(data.data) ?? [],
      };
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

export const ListModels = async () => {
  try {
    const { data } = await axios.get('/api/data/get-device-models-all');

    if (data?.status) {
      return data.data;
    } else {
      errorToast(data.errors[0].message);
    }
  } catch (error) {
    console.log('error', error);
    errorToast('Something went wrong!');
  }
};
