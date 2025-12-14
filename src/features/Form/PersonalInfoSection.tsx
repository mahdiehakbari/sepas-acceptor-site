import React, { useEffect, useState } from 'react';

import { RegisterOptions } from 'react-hook-form';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
import { validationRules } from './utils/validationRules';
import { IPersonalInfoSectionProps } from './types';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  API_CONTRACT_GET,
  API_CONTRACT_POST,
} from '@/config/api_address.config';
import { DateInput, FormTitle, Input, SelectInput } from '@/sharedComponent/ui';

export const PersonalInfoSection: React.FC<IPersonalInfoSectionProps> = ({
  t,
  register,
  errors,
  control,
  userData,
  phoneNumber,
  setValue,
}) => {
  const rules = validationRules(t);
  const token = Cookies.get('token');
  const [contract, setContract] = useState('');
  const genderItems = [
    { id: 'Male', name: t('dental-society:man') },
    { id: 'Female', name: t('dental-society:woman') },
  ];
  const educationalItems = [
    { id: 0, name: 'پست دکترا' },
    { id: 1, name: 'دکترا' },
    { id: 2, name: 'استاد' },
  ];

  const contractItems = [
    { id: 'Instant', name: t('dental-society:cash_settlement') },
    { id: 'TwoMonths', name: t('dental-society:bi_monthly') },
    { id: 'FourMonths', name: t('dental-society:four_monthly') },
    { id: 'SixMonths', name: t('dental-society:six_monthly') },
  ];

  useEffect(() => {
    axios
      .get(API_CONTRACT_GET, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        const payout = resp.data.payoutTypeDesc?.trim();
        setContract(payout);
        setValue('contractType', payout);
        axios
          .post(
            API_CONTRACT_POST,
            {
              merchantId: resp.data.merchantId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          )
          .then((resp) => {})
          .catch();
      })
      .catch();
  }, []);

  console.log(contract, 'userData');
  return (
    <section>
      <FormTitle title={t('dental-society:personal_info')} />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-right mb-12'>
        <Input
          label={t('dental-society:name')}
          name='firstName'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          defaultValue={userData?.firstName ?? ''}
          disabled={!!userData?.firstName}
        />

        <Input
          label={t('dental-society:last_name')}
          name='lastName'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          defaultValue={userData?.lastName ?? ''}
          disabled={!!userData?.lastName}
        />

        <Input
          label={t('dental-society:phone_number')}
          name='mobile'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          rules={rules.mobile as unknown as RegisterOptions<IProfileFormValues>}
          defaultValue={userData?.phoneNumber ?? phoneNumber}
          disabled={!!userData?.phoneNumber || !!phoneNumber}
        />

        <Input
          label={t('dental-society:national_id')}
          name='nationalId'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          rules={
            rules.nationalId as unknown as RegisterOptions<IProfileFormValues>
          }
          defaultValue={userData?.nationalId ?? ''}
          disabled={!!userData?.nationalId}
        />

        <DateInput
          control={control}
          name='birthDate'
          label={t('dental-society:birth_date')}
          errors={errors}
          rules={{ required: t('dental-society:field_required') }}
          defaultValue={
            userData?.birthDate && !isNaN(Date.parse(userData.birthDate))
              ? userData.birthDate
              : undefined
          }
          disabled={!!userData?.birthDate}
        />
        <SelectInput
          label={t('dental-society:gender')}
          name='gender'
          register={register}
          options={genderItems.map((c) => ({
            value: c.id.toString(),
            label: c.name,
          }))}
          errors={errors}
          rules={{ required: t('dental-society:field_required') }}
          defaultValue={
            userData?.gender !== undefined ? String(userData.gender) : ''
          }
          disabled={!!userData?.gender}
        />

        <Input
          label={t('dental-society:medical_system_number')}
          name='certificateNumber'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          defaultValue={userData?.certificateNumber ?? ''}
          disabled={!!userData?.certificateNumber}
        />

        <Input
          label={t('dental-society:doctor_title')}
          name='professionalTitle'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          defaultValue={userData?.professionalTitle ?? ''}
          disabled={!!userData?.professionalTitle}
        />

        <SelectInput
          label={t('dental-society:contract_type')}
          name='contractType'
          register={register}
          options={contractItems.map((c) => ({
            value: c.id.toString(),
            label: c.name,
          }))}
          errors={errors}
          rules={{ required: t('dental-society:field_required') }}
          defaultValue={contract}
          disabled={!!contract}
        />

        <Input
          label={t('dental-society:email')}
          name='email'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          rules={{ required: false }}
          defaultValue={userData?.email ?? ''}
        />
      </div>
    </section>
  );
};
