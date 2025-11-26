'use client';
import { useMerchantContracts } from '@/features/ContractStatus/hooks/useMerchantContracts';
import { ContentStateWrapper } from '@/features/layout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const ContractStatus = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const token = Cookies.get('token');
  const { fetchContracts, requestsData, pageLoading } = useMerchantContracts({
    pageSize: 10,
  });

  useEffect(() => {
    fetchContracts(page);
  }, [page]);

  return (
    <ContentStateWrapper
      loading={pageLoading}
      isEmpty={!requestsData || requestsData?.items.length === 0}
      loadingText={t('panel:page_loading')}
      emptyText={t('panel:empty')}
    >
      <div className='max-w-6xl mx-auto mt-6'>
        <h1 className='text-black font-bold text-lg mb-4'>
          {t('settlement_status:settlement_list')}
        </h1>
      </div>
    </ContentStateWrapper>
  );
};

export default ContractStatus;
