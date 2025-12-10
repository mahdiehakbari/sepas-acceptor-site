import axios from 'axios';

import { API_UPDATE_PROFILE } from '@/config/api_address.config';
import { IUpdateProfileValues } from '../types';

export const updateProfile = async (
  token: string,
  data: Partial<IUpdateProfileValues>,
) => {
  return axios.put(API_UPDATE_PROFILE, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
