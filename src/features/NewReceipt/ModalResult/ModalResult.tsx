'use client';

import { Button } from '@/sharedComponent/ui/Button/Button';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { IModalResultProps } from './types';

export const ModalResult = ({
  errorResult,
  handleClose,
  resultData,
}: IModalResultProps) => {
  const { t } = useTranslation();
  return (
    <div className='md:w-[600px]'>
      <div className='flex flex-col items-center justify-center'>
        {errorResult == '' ? (
          <div className='mt-8 mb-12 text-center'>
            <div className='flex justify-center mb-4'>
              <Image
                src='/assets/icons/success-icon.svg'
                alt='logo'
                width={64}
                height={64}
                className='cursor-pointer hover:opacity-80'
              />
            </div>

            <p className='text-[20px] font-bold mb-4 text-(--active-loan-text)'>
              {t('panel:successful_transaction')}
            </p>

            <div className='bg-[#EBFAEB] p-4 md:w-[432px] rounded-2xl'>
              <div className='flex items-center justify-between'>
                <p className='text-[16px] font-normal mb-4 text-(--active-loan-text)'>
                  {t('panel:transaction_amount')}
                </p>
                <p className='text-[16px] font-medium mb-4 text-(--active-loan-text)'>
                  {resultData?.amount.toLocaleString('fa-IR')}
                </p>
              </div>
{/* 
              <div className='flex items-center justify-between'>
                <p className='text-[16px] font-normal mb-4 text-(--active-loan-text)'>
                  {t('panel:transaction_date')}
                </p>
                <p className='text-[16px] font-medium mb-4 text-(--active-loan-text)'>
                  -
                </p>
              </div> */}

              <div className='flex items-center justify-between'>
                <p className='text-[16px] font-normal mb-4 text-(--active-loan-text)'>
                  {t('panel:customer_phone')}
                </p>
                <p className='text-[16px] font-medium mb-4 text-(--active-loan-text)'>
                  {resultData?.customerPhone}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className='mt-10 mb-12 text-center'>
            <div className='flex justify-center mb-4'>
              <Image
                src='/assets/icons/error-image.svg'
                alt='logo'
                width={64}
                height={64}
                className='cursor-pointer hover:opacity-80'
              />
            </div>
            <p className='text-[20px] font-bold mb-4 text-(--danger-color)'>
              {t('panel:unsuccessful_transaction')}
            </p>
            <p className='text-[16px] font-medium mb-4 text-black'>
              {t('panel:transaction_amount_exceeds')}
            </p>
          </div>
        )}
      </div>
      <div className='flex justify-end border-t border-[#E6E6E6] px-4 py-2'>
        <Button className='w-[78px]' onClick={handleClose}>
          {t('panel:close')}
        </Button>
      </div>
    </div>
  );
};
