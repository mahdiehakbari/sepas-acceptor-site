// 'use client';
// import axios, { AxiosRequestConfig } from 'axios';
// import { DateObject } from 'react-multi-date-picker';
// import qs from 'qs';
// import { IFilterParams } from './types';
// import { API_ENIAC_QUERY } from '@/config/api_address.config';
// import persian from 'react-date-object/calendars/persian';

// export function useFilter<T>(
//   token: string | undefined,
//   setRequestData: (data: T) => void,
// ) {
//   const formatShamsiDate = (date: DateObject | null) => {
//     if (!date) return undefined;
//     const persianDate = date.convert(persian);
//     const y = persianDate.year;
//     const m = String(persianDate.month).padStart(2, '0');
//     const d = String(persianDate.day).padStart(2, '0');
//     return `${y}-${m}-${d}`;
//   };

//   const filterData = async (
//     fromDate: DateObject | null,
//     toDate: DateObject | null,
//     pageNumber: number = 1,
//     pageSize: number = 10,
//   ) => {
//     const fromPaymentDate = formatShamsiDate(fromDate);
//     const toPaymentDate = formatShamsiDate(toDate);

//     const params: IFilterParams = { pageNumber, pageSize };
//     if (fromPaymentDate) params.fromPaymentDate = fromPaymentDate;
//     if (toPaymentDate) params.toPaymentDate = toPaymentDate;

//     const config: AxiosRequestConfig = {
//       headers: { Authorization: `Bearer ${token}` },
//       params,
//       paramsSerializer: (params) =>
//         qs.stringify(params, { arrayFormat: 'repeat' }),
//     };

//     try {
//       const res = await axios.get<T>(API_ENIAC_QUERY, config);
//       setRequestData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return { filterData };
// }

'use client';
import axios, { AxiosRequestConfig } from 'axios';
import { DateObject } from 'react-multi-date-picker';
import qs from 'qs';
import { IFilterParams } from './types';
import { API_ENIAC_QUERY } from '@/config/api_address.config';
import persian from 'react-date-object/calendars/persian';

export function useFilter<T>(
  token: string | undefined,
  setRequestData: (data: T) => void,
) {
  const formatShamsiDate = (date: DateObject | null) => {
    if (!date) return undefined;
    const persianDate = date.convert(persian);
    const y = persianDate.year;
    const m = String(persianDate.month).padStart(2, '0');
    const d = String(persianDate.day).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const filterData = async (
    fromDate: DateObject | null,
    toDate: DateObject | null,
    pageNo: number = 1,
    count: number = 10,
  ) => {
    const fromPaymentDate = formatShamsiDate(fromDate);
    const toPaymentDate = formatShamsiDate(toDate);

    const params: IFilterParams = {
      pageNo,
      count,
      pageSize: 0,
    };
    if (fromPaymentDate) params.fromPaymentDate = fromPaymentDate;
    if (toPaymentDate) params.toPaymentDate = toPaymentDate;

    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    };

    try {
      const res = await axios.get<T>(API_ENIAC_QUERY, config);
      // کاملاً جایگزین کردن داده‌ها برای هر صفحه
      setRequestData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return { filterData };
}
