'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_AUTHENTICATE_ME, API_MERCHANT } from '@/config/api_address.config';
import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';
import { Paginate } from '@/sharedComponent/ui/Paginate/Paginate';
import { TransactionListTable } from '@/features/TransactionList';
import { IUserData } from './types';

const Receipts = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [customerId, setCustomerId] = useState('');
  const [requestsData, setRequestData] = useState<IUserData | null>(null);
  const [page, setPage] = useState(1);
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPageLoading(false);
      return;
    }

    axios
      .get(API_AUTHENTICATE_ME, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCustomerId(res.data.merchantId);
      })
      .catch((err) => console.error(err));
  }, [token]);

  useEffect(() => {
    if (!customerId) return;

    axios
      .get(`${API_MERCHANT}/${customerId}?page=${page}&pageSize=10`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRequestData(res.data);
        console.log(res.data, 'ggggg');
      })
      .catch((err) => console.error(err))
      .finally(() => setPageLoading(false));
  }, [customerId, page]);

  if (pageLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <SpinnerDiv size='lg' />
        <p className='px-2'>در حال بارگذاری...</p>
      </div>
    );
  }

  if (!requestsData || requestsData.purchaseRequests.length === 0) {
    return (
      <div className='text-center mt-10 text-gray-500'>
        هیچ داده‌ای یافت نشد.
      </div>
    );
  }

  const purchaseRequests = requestsData.purchaseRequests;
  const pageSize = requestsData.pageSize || 10;
  const totalCount = requestsData.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const currentPage = page;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className='max-w-6xl mx-auto mt-6'>
      <h1 className='text-black font-bold text-lg mb-4'>
        {t('transaction:transaction_list')}
      </h1>

      <div className='hidden md:block'>
        <TransactionListTable
          requests={purchaseRequests}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
      <div className='block md:hidden'>
        {/* <ResponsiveTransactionTable
          requests={items}
          currentPage={currentPage}
          pageSize={pageSize}
        /> */}
      </div>
      <Paginate
        hasPreviousPage={hasPreviousPage}
        setPage={setPage}
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default Receipts;
