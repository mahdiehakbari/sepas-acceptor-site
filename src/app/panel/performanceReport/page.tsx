'use client';

import { PerformanceReportAmount } from '@/features/PerformanceReportAmount';
import { SimpleSelect } from '@/sharedComponent/ui';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { months, years } from './constants';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarExample } from '@/features/Barchart';
import {
  API_MERCHANT_MONTH,
  API_MERCHANT_OVERALL,
} from '@/config/api_address.config';
import { IChartItem, IMerchantOverallData } from './types';

const PerformanceReport = () => {
  const { t } = useTranslation();
  const { control, watch } = useForm<{ year: string; month: string }>({
    defaultValues: { year: '1404', month: '9' },
  });

  const selectedYear = watch('year');
  const selectedMonth = watch('month');

  const [data, setData] = useState<IChartItem[]>([]);
  const [overAllData, setOverAllData] = useState<IMerchantOverallData | null>(
    null,
  );
  const number = 200;
  const number1 = 40000000;
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!selectedYear || !selectedMonth) return;

    const fetchMonthlyData = async () => {
      try {
        if (!token) return;

        const res = await axios.get(API_MERCHANT_MONTH, {
          params: {
            shamsiYear: parseInt(selectedYear),
            shamsiMonth: parseInt(selectedMonth),
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const chartData: IChartItem[] = res.data.dailyData.map(
          (item: {
            day: string;
            totalAmountOfCompletedPurchaseRequests: number;
          }) => ({
            day: item.day,
            value: item.totalAmountOfCompletedPurchaseRequests,
          }),
        );

        setData(chartData);
      } catch (error) {
        setData([]);
      }
    };

    fetchMonthlyData();
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    axios
      .get(API_MERCHANT_OVERALL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOverAllData(res.data);
      })
      .catch();
  }, []);

  return (
    <div className='mt-16 mb-6 md:mx-16 bg-[#E9F4FC] p-4 rounded-2xl'>
      <div className='md:flex items-center justify-between mb-2'>
        <div className='flex justify-between md:justify-start items-center gap-1 md:mb-0 mb-1'>
          <h3 className='font-normal text-(--text-gray) text-[16px]'>
            {t('performance-report:performance_report')}
          </h3>
          <h3 className='font-medium text-black text-[16px]'>
            {overAllData?.numberOfUniqueCustomers.toLocaleString('fa-IR')}
          </h3>
        </div>

        <div className='flex justify-between md:justify-start items-center gap-1'>
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
          amount={
            overAllData?.totalAmountOfCompletedPurchaseRequests.toLocaleString(
              'fa-IR',
            ) || '0'
          }
        />

        <PerformanceReportAmount
          image={'/assets/icons/icon-credit.svg'}
          title={t('performance-report:credit_settled')}
          amount={
            overAllData?.totalAmountOfPaidOutPurchaseRequests.toLocaleString(
              'fa-IR',
            ) || '0'
          }
        />

        <PerformanceReportAmount
          image={'/assets/icons/icon-credit_balance.svg'}
          title={t('performance-report:credit_balance')}
          amount={
            overAllData?.totalAmountOfUnpaidPurchaseRequests.toLocaleString(
              'fa-IR',
            ) || '0'
          }
          isLast
        />
      </div>

      <div
        className='bg-white rounded-2xl'
        style={{ boxShadow: '0px 0px 4.19px 0px #0000001F' }}
      >
        <p className='text-center pt-4 mb-2 font-medium text-[20px]'>
          {t('performance-report:transaction_status')}
        </p>
        <div className='mb-6 flex items-center justify-center gap-1'>
          {selectedMonth && selectedYear && (
            <>
              <p className='text-[12px] text-gray-500 mt-1'>
                {months.find((m) => m.value === selectedMonth)?.label} -
              </p>
              <p className='text-[12px] text-gray-500 mt-1'>{selectedYear}</p>
            </>
          )}
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center mx-6 mb-6'>
          <div className='flex items-center gap-1 px-6'>
            <Image
              src='/assets/icons/blue-circle.svg'
              alt='circle'
              width={14}
              height={14}
            />
            <p className='font-medium text-[14px] text-(--second-text-gray)'>
              {t('performance-report:transaction_amount')}
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <div>
              <label className='text-second-text-color font-medium text-[12px] pr-2'>
                ماه
              </label>
              <Controller
                name='month'
                control={control}
                render={({ field }) => (
                  <SimpleSelect
                    label='ماه'
                    value={field.value}
                    onChange={field.onChange}
                    options={months}
                  />
                )}
              />
            </div>

            <div>
              <label className='text-second-text-color font-medium text-[12px] pr-2'>
                سال
              </label>
              <Controller
                name='year'
                control={control}
                render={({ field }) => (
                  <SimpleSelect
                    label='سال'
                    value={field.value}
                    onChange={field.onChange}
                    options={years}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <BarExample data={data} />
      </div>
    </div>
  );
};

export default PerformanceReport;
