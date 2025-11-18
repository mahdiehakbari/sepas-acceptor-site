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
import { ResponsiveTransactionTable } from '@/features/TransactionList/TransactionListTable/ResponsiveTransactionTable';
import { paginate } from '../utils/Paginate';
import { Filteredtabel } from '@/features/Filteredtabel';
import { DateObject } from 'react-multi-date-picker';
import { filterTable } from '../utils/filterTable';
import { ContentStateWrapper } from '@/features/layout';

const Receipts = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [customerId, setCustomerId] = useState('');
  const [requestsData, setRequestData] = useState<ITransactionsData | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [planName, setPlanName] = useState('');
  const [filterData, setFilterData] = useState(null);
  const [fromDate, setFromDate] = useState<DateObject | null>(null);
  const [toDate, setToDate] = useState<DateObject | null>(null);
  const token = Cookies.get('token');

  const pageSize = 10;

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
        console.log(res.data);
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
        console.log(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setPageLoading(false));
  }, [customerId, token]);

  const handleFilter = () => {
    if (!requestsData) return;
    const result = filterTable({
      data: requestsData.items,
      planName,
      fromDate,
      toDate,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    setFilterData(result);
  };

  const {
    displayItems,
    totalPages,
    currentPage,
    hasPreviousPage,
    hasNextPage,
  } = paginate(filterData ?? requestsData?.items ?? [], page, pageSize);
  const isFilterButtonDisabled = !planName && !fromDate && !toDate;

  return (
    <ContentStateWrapper
      loading={pageLoading}
      isEmpty={!requestsData || requestsData.items.length === 0}
      loadingText={t('panel:page_loading')}
      emptyText={t('panel:empty')}
    >
      <div className='max-w-6xl mx-auto mt-6'>
        <h1 className='text-black font-bold text-lg mb-4'>
          {t('transaction:transaction_list')}
        </h1>
        <Filteredtabel
          planName={planName}
          setPlanName={setPlanName}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          handleFilter={handleFilter}
          isFilterButtonDisabled={isFilterButtonDisabled}
          placeholderText={t('home:search_plane')}
        />
        <div className='hidden md:block'>
          <TransactionListTable
            requests={displayItems}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </div>
        <div className='block md:hidden'>
          <ResponsiveTransactionTable
            requests={displayItems}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </div>

        <Paginate
          hasPreviousPage={hasPreviousPage}
          setPage={setPage}
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
        />
      </div>
    </ContentStateWrapper>
  );
};

export default Receipts;
