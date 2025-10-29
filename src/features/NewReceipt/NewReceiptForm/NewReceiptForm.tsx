'use client';
import { useForm, Controller } from 'react-hook-form';
import { INewReceiptProps, TFormValues } from './types';
import { NumericFormat } from 'react-number-format';
import { Button } from '@/sharedComponent/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_PURCHASE_REQUESTS_COMMAND } from '@/config/api_address.config';
import { useState } from 'react';
import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';

export const NewReceiptForm = ({
  setShowOtpModal,
  setPhoneNumber,
  setAmountNumber,
}: INewReceiptProps) => {
  const { t } = useTranslation();
  const token = Cookies.get('token');
  const [buttonLoading, setButtonLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: { customerPhoneNumber: '', amount: undefined },
  });

  const onSubmit = (data: TFormValues) => {
    setButtonLoading(true);
    const amountNumber = Number(String(data.amount).replace(/,/g, ''));
    axios
      .post(
        API_PURCHASE_REQUESTS_COMMAND,
        {
          customerPhoneNumber: data.customerPhoneNumber,
          amount: amountNumber,
          description: 'New Receipt ',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((resp) => {
        setButtonLoading(false);
        Cookies.set('purchaseRequestId', resp.data.purchaseRequestId);
        setShowOtpModal(true);
        setPhoneNumber(data.customerPhoneNumber);
        setAmountNumber(data.amount);
      })
      .catch(() => {
        setButtonLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <div className='mb-5'>
          <input
            type='tel'
            placeholder={t('panel:patient_mobile')}
            {...register('customerPhoneNumber', {
              required: true,
              maxLength: 11,
            })}
            className={`bg-white w-full border rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 text-left placeholder:text-right ${
              errors.customerPhoneNumber
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.customerPhoneNumber && (
            <p className='text-red-500 text-sm mb-2'>
              {t('panel:invalid_phone')}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <Controller
            name='amount'
            control={control}
            rules={{ required: t('panel:amount_required') }}
            render={({ field }) => (
              <NumericFormat
                {...field}
                value={field.value ?? ''}
                placeholder={t('panel:amount')}
                className={`bg-white w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${
                  errors.amount
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-blue-500'
                }${field.value ? ' text-left' : ' text-right'}`}
                thousandSeparator=','
                allowNegative={false}
                onValueChange={(values) => {
                  field.onChange(values.floatValue ?? undefined);
                }}
              />
            )}
          />

          {errors.amount && (
            <p className='text-red-500 text-sm mt-1'>{errors.amount.message}</p>
          )}
        </div>

        <Button type='submit' className='w-full'>
          {buttonLoading == true ? <SpinnerDiv /> : t('panel:registration')}
        </Button>
      </form>
    </div>
  );
};
