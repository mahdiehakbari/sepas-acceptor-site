'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
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
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [remove, setRemove] = useState(false);

  const token = Cookies.get('token');
  const pageSize = 10;

  useFetchAcceptor(setAcceptorData);
  const { filterData } = useFilter<ITransactionsData>(token, setRequestData);

  const fetchData = async (
    pageNumber: number = 1,
    fFromDate: DateObject | null,
    fToDate: DateObject | null,
    fAcceptorName: ISelectOption[],
    fReferenceNumber: string | null,
  ) => {
    setPageLoading(true);

    const customerIds = (fAcceptorName ?? []).map(
      (c: ISelectOption) => c.value,
    );

    await filterData(
      fFromDate,
      fToDate,
      customerIds,
      pageNumber,
      pageSize,
      fReferenceNumber ? Number(fReferenceNumber) : undefined,
    );

    setPageLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData(page, fromDate, toDate, acceptorName, referenceNumber);
  }, [page]);

  const handleFilter = () => {
    setPage(1);
    fetchData(1, fromDate, toDate, acceptorName, referenceNumber);
    setIsOpenModal(false);
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleRemoveFilter = () => {
    setAcceptorName([]);
    setFromDate(null);
    setToDate(null);
    setReferenceNumber(null);

    setPage(1);
    fetchData(1, null, null, [], null);

    setIsOpenModal(false);
    setRemove(false);
  };

  useEffect(() => {
    const hasFilter =
      (referenceNumber && referenceNumber.trim() !== '') ||
      fromDate !== null ||
      toDate !== null ||
      acceptorName.length > 0;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemove(hasFilter);
  }, [fromDate, toDate, referenceNumber, acceptorName]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <ContentStateWrapper
      loading={pageLoading}
      loadingText={t('panel:page_loading')}
    >
      <div className='max-w-6xl mx-auto mt-6'>
        <PageHeader
          titleKey='transaction:transaction_list'
          onFilterClick={handleOpenModal}
          handleRemoveFilter={handleRemoveFilter}
          remove={remove}
        />

        {!requestsData || requestsData.items.length === 0 ? (
          <div className='text-center mt-10 text-gray-500'>
            {t('panel:empty')}
          </div>
        ) : (
          <>
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
          </>
        )}
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
          referenceNumber={referenceNumber}
          setReferenceNumber={setReferenceNumber}
        />
      </ResponsiveModal>
    </ContentStateWrapper>
  );
};

export default Receipts;
