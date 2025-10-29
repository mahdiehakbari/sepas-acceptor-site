'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_AUTHENTICATE_ME, API_MERCHANT } from '@/config/api_address.config';
import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';
import { Paginate } from '@/sharedComponent/ui/Paginate/Paginate';
import { TransactionListTable } from '@/features/TransactionList';
import { ITransactionsData } from './types';

const Receipts = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [customerId, setCustomerId] = useState('');
  const [requestsData, setRequestData] = useState<ITransactionsData | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const token = Cookies.get('token');

  const pageSize = 10;

  // گرفتن merchantId
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
      .get(`${API_MERCHANT}/${customerId}/paged?page=1&pageSize=1000`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRequestData(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setPageLoading(false));
  }, [customerId, token]);

  if (pageLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <SpinnerDiv size='lg' />
        <p className='px-2'>در حال بارگذاری...</p>
      </div>
    );
  }

  if (!requestsData || requestsData.items.length === 0) {
    return (
      <div className='text-center mt-10 text-gray-500'>
        هیچ داده‌ای یافت نشد.
      </div>
    );
  }

  const totalCount = requestsData.items.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const currentPage = page;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const displayItems = requestsData.items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className='max-w-6xl mx-auto mt-6'>
      <h1 className='text-black font-bold text-lg mb-4'>
        {t('transaction:transaction_list')}
      </h1>

      <div className='hidden md:block'>
        <TransactionListTable
          requests={displayItems}
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
