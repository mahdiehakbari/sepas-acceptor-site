'use client';

import { BarExample } from '@/features/Barchart';
import { PerformanceReportAmount } from '@/features/PerformanceReportAmount';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const PerformanceReport = () => {
  const { t } = useTranslation();
  const number = 200;
  const number1 = 40000000;
  return (
    <div className='mt-16 mb-6 md:mx-16 bg-[#E9F4FC] p-4 rounded-2xl'>
      <div className='md:flex items-center justify-between mb-2'>
        <div className='flex justify-between md:justify-start items-center gap-1 md:mb-0 mb-1'>
          <h3 className='font-normal text-(--text-gray) text-[16px]'>
            {t('performance-report:performance_report')}
          </h3>
          <h3 className='font-medium text-black text-[16px]'>
            {number.toLocaleString('fa-IR')}
          </h3>
        </div>

        <div className='flex justify-between md:justify-start  items-center gap-1'>
          <h3 className='font-normal text-(--text-gray) text-[16px]'>
            {t('performance-report:contract_status')}
          </h3>
          <h3 className='font-medium text-black text-[16px]'>فعال</h3>
        </div>
      </div>

      <div className='bg-white rounded-2xl md:py-6 md:flex items-center mb-8'>
        <PerformanceReportAmount
          image={'/assets/icons/icon-wallet.svg'}
          title={t('performance-report:credit_amount')}
          amount={number1.toLocaleString('fa-IR')}
        />

        <PerformanceReportAmount
          image={'/assets/icons/icon-credit.svg'}
          title={t('performance-report:credit_settled')}
          amount={number1.toLocaleString('fa-IR')}
        />

        <PerformanceReportAmount
          image={'/assets/icons/icon-credit_balance.svg'}
          title={t('performance-report:credit_balance')}
          amount={number1.toLocaleString('fa-IR')}
          isLast
        />
      </div>

      <div
        className='bg-white rounded-2xl'
        style={{ boxShadow: '0px 0px 4.19px 0px #0000001F' }}
      >
        <p className='text-center pt-4 mb-6 font-medium text-[20px]'>
          {t('performance-report:transaction_status')}
        </p>

        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-1 px-6'>
            <Image
              src='/assets/icons/blue-circle.svg'
              alt='circle'
              width={14}
              height={14}
            />
            <p className='font-medium text-[14px]'>
              {t('performance-report:transaction_amount')}
            </p>
          </div>
        </div>
        <BarExample />
      </div>
    </div>
  );
};

export default PerformanceReport;
