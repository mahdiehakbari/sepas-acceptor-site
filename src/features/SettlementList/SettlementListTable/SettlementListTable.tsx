'use client';

import { useTranslation } from 'react-i18next';
import { getThItems } from './constants';
import { useStatusInfo } from './utils/useStatusInfo';
import { ISettlementListTableProps } from './types';

export const SettlementListTable = ({
  requests,
  currentPage,
  pageSize,
}: ISettlementListTableProps) => {
  const { t } = useTranslation();
  const { getStatusInfo } = useStatusInfo();

  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-separate [border-spacing:0_16px]'>
        <thead>
          <tr>
            <th colSpan={5} className='p-0'>
              <div className='flex bg-(--block-color) border border-(--block-color) rounded-lg px-3 py-3 font-semibold text-gray-700 text-sm'>
                {getThItems().map((item) => (
                  <div key={item.id} className='w-1/1 text-right'>
                    {item.label}
                  </div>
                ))}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {requests.map((Settlement, index) => {
            const { label, className } = getStatusInfo(Settlement.status);

            return (
              <tr key={Settlement.uuid}>
                <td colSpan={5} className='p-0'>
                  <div className='flex items-center justify-between bg-white border border-border-color rounded-lg px-3 py-3'>
                    <div className='w-[60%] text-right'>
                      {index + 1 + (currentPage - 1) * pageSize}
                    </div>
                    {/* <div className='w-[27%] text-center'></div> */}
                    <div className='w-[20%] text-center flex items-center gap-1.5'>
                      {Settlement.payment_date}
                    </div>
                    <div className='w-[100%] text-center'>
                      {Settlement.amount.toLocaleString('fa-IR')}
                    </div>
                    {/* <div className='w-[20%] text-center'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}
                      >
                        {label}
                      </span>
                    </div> */}
                    {/* <div className='w-[25%] text-center'>
                      <p className='text-primary text-[12px] font-medium'>
                        {t('settlement_status:more')}
                      </p>
                    </div> */}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
