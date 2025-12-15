import axios, { AxiosRequestConfig } from 'axios';

import qs from 'qs';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import { IFilterParams } from './types';
import { API_ENIAC_QUERY } from '@/config/api_address.config';

export function useFilter<T>(
  token: string | undefined,
  setRequestData: (data: T) => void,
) {
  const filterData = async (
    fromPaymentDate: DateObject | null,
    toPaymentDate: DateObject | null,
    fromDate: DateObject | null,
    toDate: DateObject | null,
    pageNo: number = 1,
    count: number = 10,
    customerIds: string[] = [],
    referenceNumber?: number | null,
  ) => {
    const formatShamsiDate = (date: DateObject | null) => {
      if (!date) return undefined;
      const persianDate = date.convert(persian);
      const y = persianDate.year;
      const m = String(persianDate.month).padStart(2, '0');
      const d = String(persianDate.day).padStart(2, '0');
      return `${y}-${m}-${d}`;
    };

    const params: IFilterParams = {
      pageNo,
      count,
      customerIds,
      referenceNumber,
      fromPaymentDate: fromPaymentDate
        ? formatShamsiDate(fromPaymentDate)
        : undefined,
      toPaymentDate: toPaymentDate
        ? formatShamsiDate(toPaymentDate)
        : undefined,
      fromDate: fromDate ? formatShamsiDate(fromDate) : undefined,
      toDate: toDate ? formatShamsiDate(toDate) : undefined,
    };

    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    };

    try {
      const res = await axios.get<T>(API_ENIAC_QUERY, config);
      setRequestData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return { filterData };
}
