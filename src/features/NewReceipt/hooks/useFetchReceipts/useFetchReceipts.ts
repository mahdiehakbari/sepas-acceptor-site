import { useState } from 'react';
import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { API_MERCHANT_DOCUMENTS } from '@/config/api_address.config';
import { ISelectOption } from '../../ReceiptsFilter/types';

interface useFetchReceiptsProps {
  pageSize?: number;
}

export const useFetchReceipts = ({
  pageSize = 10,
}: useFetchReceiptsProps = {}) => {
  const token = Cookies.get('token');

  const [requestsData, setRequestData] = useState<ISettlementsData | null>(
    null,
  );
  const [pageLoading, setPageLoading] = useState(false);

  const fetchData = async (
    pageNumber = 1,
    merchantName: ISelectOption[] = [],
  ) => {
    if (!token) return;

    setPageLoading(true);

    const merchantIds = merchantName.map((m) => m.value);

    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        pageNo: pageNumber,
        count: pageSize,
        ...(merchantIds.length > 0 ? { merchantIds } : {}),
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    };

    try {
      const res = await axios.get<ISettlementsData>(
        API_MERCHANT_DOCUMENTS,
        config,
      );
      setRequestData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  };

  return { fetchData, requestsData, pageLoading };
};
