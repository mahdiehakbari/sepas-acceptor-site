'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_AUTHENTICATE_ME, API_MERCHANT } from '@/config/api_address.config';
import { Paginate } from '@/sharedComponent/ui/Paginate/Paginate';
import { TransactionListTable } from '@/features/TransactionList';
import { ITransactionsData } from './types';
import { ResponsiveTransactionTable } from '@/features/TransactionList/TransactionListTable/ResponsiveTransactionTable';
import { ContentStateWrapper } from '@/features/layout';
import { PageHeader } from '@/features/PageHeader';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { ReceiptsFilter } from '@/features/NewReceipt';
import {
  IAcceptorData,
  ISelectOption,
} from '@/features/NewReceipt/ReceiptsFilter/types';
import { useFetchAcceptor } from '@/features/hooks';
import { DateObject } from 'react-multi-date-picker';
import { useFilter } from '@/features/hooks/useFetchMerchantRequests/useFetchFilter';

const Receipts = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);
  const [requestsData, setRequestData] = useState<ITransactionsData | null>(
    null,
  );
  const [acceptorName, setAcceptorName] = useState<ISelectOption[]>([]);
  const [acceptorData, setAcceptorData] = useState<IAcceptorData[]>([]);
  const [fromDate, setFromDate] = useState<DateObject | null>(null);
  const [toDate, setToDate] = useState<DateObject | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const token = Cookies.get('token');
  const pageSize = 10;
  useFetchAcceptor(setAcceptorData);
  const { filterData } = useFilter<ITransactionsData>(token, setRequestData);

  const fetchData = async (pageNumber = 1) => {
    const customerIds = acceptorName.map((c) => c.value);
    setPageLoading(true);

    await filterData(fromDate, toDate, customerIds, pageNumber, pageSize);

    setPageLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData(page);
  }, [page]);
  const handleFilter = () => {
    setPage(1);
    fetchData(1);
    setIsOpenModal(false);
  };

  const handleClose = () => {
    setPage(1);
    fetchData(1);
    setAcceptorName([]);
    setIsOpenModal(false);
    setFromDate(null);
    setToDate(null);
  };

  const handleRemoveFilter = () => {
    setPage(1);
    fetchData(1);
    setAcceptorName([]);
    setFromDate(null);
    setToDate(null);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <ContentStateWrapper
      loading={pageLoading}
      isEmpty={!requestsData || requestsData.items.length === 0}
      loadingText={t('panel:page_loading')}
      emptyText={t('panel:empty')}
    >
      <div className='max-w-6xl mx-auto mt-6'>
        <PageHeader
          titleKey='transaction:transaction_list'
          onFilterClick={handleOpenModal}
        />

        <div className='hidden md:block'>
          <TransactionListTable
            requests={requestsData?.items ?? []}
            currentPage={requestsData?.pageNumber ?? 1}
            pageSize={requestsData?.pageSize ?? pageSize}
          />
        </div>
        <div className='block md:hidden'>
          <ResponsiveTransactionTable
            requests={requestsData?.items ?? []}
            currentPage={requestsData?.pageNumber ?? 1}
            pageSize={requestsData?.pageSize ?? pageSize}
          />
        </div>

        <Paginate
          hasPreviousPage={requestsData?.hasPreviousPage ?? false}
          hasNextPage={requestsData?.hasNextPage ?? false}
          currentPage={requestsData?.pageNumber ?? 1}
          totalPages={requestsData?.totalPages ?? 1}
          setPage={setPage}
        />
      </div>

      <ResponsiveModal
        title={t('panel:filter')}
        isOpen={isOpenModal}
        onClose={handleClose}
      >
        <ReceiptsFilter
          acceptorName={acceptorName}
          setAcceptorName={setAcceptorName}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          handleFilter={handleFilter}
          placeholderText={t('panel:search_customer')}
          acceptorData={acceptorData || []}
          handleRemoveFilter={handleRemoveFilter}
        />
      </ResponsiveModal>
    </ContentStateWrapper>
  );
};

export default Receipts;
