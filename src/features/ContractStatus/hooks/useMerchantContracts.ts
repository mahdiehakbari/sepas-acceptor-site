'use client';
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { IMerchantContractsData, IUseMerchantContractsProps } from './types';
import { API_MERCHANT_CONTRACTS_ME } from '@/config/api_address.config';

export const useMerchantContracts = ({
  pageSize = 10,
}: IUseMerchantContractsProps = {}) => {
  const token = Cookies.get('token');

  const [requestsData, setRequestData] =
    useState<IMerchantContractsData | null>(null);
  const [pageLoading, setPageLoading] = useState(false);

  const fetchContracts = async (pageNumber = 1) => {
    if (!token) return;

    setPageLoading(true);

    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
      params: { pageNumber, pageSize },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    };

    try {
      const res = await axios.get<IMerchantContractsData>(
        `${API_MERCHANT_CONTRACTS_ME}`,
        config,
      );
      setRequestData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  };

  return { fetchContracts, requestsData, pageLoading };
};
