import axios, { AxiosResponse } from 'axios';
import {
  API_PURCHASE_REQUESTS_COMMAND,
  API_PURCHASE_REQUESTS_VERIFY,
} from '@/config/api_address.config';
import { IResendOtpPayload } from './types';
import { PurchaseRequestResponse } from '../types';

export const resendOtpAPI = (
  phoneNumber: string,
  amountNumber: number,
  token: string | undefined,
): Promise<AxiosResponse<unknown>> => {
  return axios.post<IResendOtpPayload>(
    API_PURCHASE_REQUESTS_COMMAND,
    {
      customerPhoneNumber: phoneNumber,
      amount: amountNumber,
      description: 'New Receipt',
    },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

export const verifyOtpAPI = (
  purchaseRequestId: string,
  otp: string,
  token: string | undefined,
): Promise<AxiosResponse<PurchaseRequestResponse>> => {
  return axios.post<PurchaseRequestResponse>(
    API_PURCHASE_REQUESTS_VERIFY,
    { purchaseRequestId, otpCode: otp },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};
