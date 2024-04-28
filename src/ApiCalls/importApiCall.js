import axios from '../utils/axios';
import { get } from 'lodash';

export const uploadListForServicePartner = async (data) => {
  try {
    const payload = {
      servicePartners: data,
    };
    const updateResponse = await axios.post(`/api/service-partners/import`, payload);
    return get(updateResponse, 'data', false);
  } catch (error) {
    return false;
  }
};

export const uploadListForSystemMangment = async (data) => {
  try {
    data = data.map((val) => ({ ...val, model_number_id: parseInt(val.model_number_id) }));

    const payload = {
      device: data,
    };
    const updateResponse = await axios.post(`/api/device/import`, payload);
    return get(updateResponse, 'data', false);
  } catch (error) {
    return false;
  }
};
