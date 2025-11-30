'use client';
import {
  ResponsiveSettlementTable,
  SettlementListTable,
} from '@/features/SettlementList';
import { Paginate } from '@/sharedComponent/ui/Paginate/Paginate';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ISettlementsData } from './types';
import { ContentStateWrapper } from '@/features/layout';
import { useFilter } from '@/features/SettlementList/hooks/FilterData';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { SettlementFilter } from '@/features/SettlementList/SettlementFilter';
import { DateObject } from 'react-multi-date-picker';

const SettlementStatus = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [requestsData, setRequestData] = useState<ISettlementsData | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [fromDate, setFromDate] = useState<DateObject | null>(null);
  const [toDate, setToDate] = useState<DateObject | null>(null);
  const pageSize = 10;
  const token = Cookies.get('token');

  const { filterData } = useFilter<ISettlementsData>(token, setRequestData);

  const fetchData = async (pageNumber = 1) => {
    setPageLoading(true);

    await filterData(fromDate, toDate, pageNumber, pageSize);

    setPageLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData(page);
  }, [page]);

  const handleClose = () => {
    setPage(1);
    fetchData(1);
    setIsOpenModal(false);
    setFromDate(null);
    setToDate(null);
  };

  return (
    <ContentStateWrapper
      loading={pageLoading}
      loadingText={t('panel:page_loading')}
    >
      <div className='max-w-6xl mx-auto mt-6'>
        <h1 className='text-black font-bold text-lg mb-4'>
          {t('settlement_status:settlement_list')}
        </h1>

        {!pageLoading && !requestsData?.data?.document_list ? (
          <div className='text-center mt-10 text-gray-500'>
            {t('panel:empty')}
          </div>
        ) : (
          <>
            <div className='hidden md:block'>
              <SettlementListTable
                requests={requestsData?.data?.document_list ?? []}
                currentPage={requestsData?.pageNumber ?? 1}
                pageSize={requestsData?.pageSize ?? pageSize}
              />
            </div>

            {/* Mobile Table */}
            <div className='block md:hidden'>
              <ResponsiveSettlementTable
                requests={requestsData?.data.document_list ?? []}
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
        <ResponsiveModal
          title={t('panel:filter')}
          isOpen={isOpenModal}
          onClose={handleClose}
        >
          <SettlementFilter
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            handleFilter={handleFilter}
            placeholderText={t('panel:search_customer')}
            handleRemoveFilter={handleRemoveFilter}
          />
        </ResponsiveModal>
      </div>
    </ContentStateWrapper>
  );
};

export default SettlementStatus;
