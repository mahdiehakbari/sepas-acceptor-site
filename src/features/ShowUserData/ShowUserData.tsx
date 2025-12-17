'use client';

import { FormTitle } from '@/sharedComponent/ui';
import { useTranslation } from 'react-i18next';
import { IShowUserDataProps } from './types';
import { BirthDate } from '@/sharedComponent/lib/DateConversion';
import { API_CONTRACT_GET } from '@/config/api_address.config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const ShowUserData = ({ user }: IShowUserDataProps) => {
  const { t } = useTranslation();
  const [contract, setContract] = useState('');
  const token = Cookies.get('token');

  useEffect(() => {
    axios
      .get(API_CONTRACT_GET, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        const payout = resp.data.payoutTypeDesc?.trim();
        setContract(payout);
      })
      .catch();
  }, []);

  return (
    <div className='bg-(--block-color) rounded-2xl p-6 '>
      <FormTitle title={t('dental-society:personal_info')} />
      <div className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex justify-between items-center md:border-l-2 border-[#C2C2C2] pl-6 mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {t('dental-society:name')} و {t('dental-society:last_name')}
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {user.fullName}
            </p>
          </div>
          <div className='flex justify-between items-center  pl-6 mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {t('dental-society:phone_number')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {user.phoneNumber}
            </p>
          </div>
          <div className='flex justify-between items-center md:border-l-2 border-[#C2C2C2] pl-6  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {t('dental-society:national_id')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {user.nationalId}
            </p>
          </div>
          {/* <div className='flex justify-between items-center pl-6 mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {t('dental-society:birth_date')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              <BirthDate birthDate={user.birthDate} />
            </p>
          </div> */}
          <div className='flex justify-between items-center pl-6  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {t('dental-society:gender')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {user.gender == 'Female' ? 'زن' : 'مرد'}
            </p>
          </div>
          <div className='flex justify-between items-center  pl-6  mb-6  md:border-l-2 md:border-[#C2C2C2]'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {t('dental-society:educational')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {user.educationLevel == 0
                ? 'پست دکترا'
                : user.educationLevel == 1
                ? 'دکترا'
                : 'استاد'}
            </p>
          </div>
          <div className='flex justify-between items-center pl-6  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {t('dental-society:medical_system_number')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {user.certificateNumber}
            </p>
          </div>
          <div className='flex justify-between items-center pl-6  mb-6 md:border-l-2 md:border-[#C2C2C2]'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {t('dental-society:contract_type')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {contract == 'Instant'
                ? t('dental-society:cash_settlement')
                : contract == 'TwoMonths'
                ? t('dental-society:bi_monthly')
                : contract == 'FourMonths'
                ? t('dental-society:four_monthly')
                : t('dental-society:six_monthly')}
            </p>
          </div>
          <div className='flex justify-between items-center pl-6 mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {t('dental-society:email')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {user.email || '-'}
            </p>
          </div>
          <div className='flex justify-between items-center pl-6 mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              درباره‌ی من:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>{user.bio}</p>
          </div>
        </div>

        <FormTitle title={t('dental-society:bank_info')} />
        <div className='grid grid-cols-2 gap-4 mt-2'>
          <div className='flex justify-between items-center  mb-6 pl-6'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {t('dental-society:iban_number')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {user.iban || '-'}
            </p>
          </div>
        </div>
        <FormTitle title={t('dental-society:address_info')} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
          <div className='flex justify-between items-center md:border-l-2 border-[#C2C2C2] pl-6  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>استان:</p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {user.address?.provinceName}
            </p>
          </div>
          <div className='flex justify-between items-center  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>شهر:</p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {user.address?.cityName}
            </p>
          </div>
          {/* <div className='flex justify-between items-center md:border-l-2 border-[#C2C2C2] pl-6  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {t('dental-society:zip_code')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {user.address?.postalCode}
            </p>
          </div> */}
          <div className='flex justify-between items-center  mb-6 pl-6 md:border-l-2 md:border-[#C2C2C2]'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {t('dental-society:office_number')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {user?.workPlacePhoneNumber}
            </p>
          </div>
          <div className='flex justify-between items-center  pl-6  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {t('dental-society:address')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-medium'>
              {user.merchantAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
