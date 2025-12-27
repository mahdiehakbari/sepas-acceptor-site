'use client';
import { useForm, Controller } from 'react-hook-form';
import { INewReceiptProps, TFormValues } from './types';
import { Button } from '@/sharedComponent/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_PURCHASE_REQUESTS_COMMAND } from '@/config/api_address.config';
import { useEffect, useState } from 'react';
import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';
import { numberToPersianWords } from '@/features/utils/numberToPersianWords';

export const NewReceiptForm = ({
  setShowOtpModal,
  setPhoneNumber,
  setAmountNumber,
  registerReset,
  setShowModalResult,
  setErrorResult,
}: INewReceiptProps) => {
  const { t } = useTranslation();
  const token = Cookies.get('token');
  const [buttonLoading, setButtonLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: { customerPhoneNumber: '', amount: undefined },
  });
  useEffect(() => {
    if (registerReset) registerReset(reset);
  }, [registerReset, reset]);

  const toEnglishDigits = (str: string) =>
    str.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));

  const onSubmit = (data: TFormValues) => {
    setButtonLoading(true);

    const englishPhone = toEnglishDigits(data.customerPhoneNumber);

    const amountNumber = Number(String(data.amount).replace(/,/g, ''));
    axios
      .post(
        API_PURCHASE_REQUESTS_COMMAND,
        {
          customerPhoneNumber: englishPhone,
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
      .catch((err) => {
        setErrorResult(err.response.data.message);
        setShowModalResult(true);
        setShowOtpModal(true);
        setButtonLoading(false);
      });
  };

  const phoneValue = watch('customerPhoneNumber');

  const toPersianDigits = (num: string | number) =>
    num.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

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
              onChange: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              },
            })}
            value={toPersianDigits(phoneValue || '')}
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
          <div className='relative'>
            <span className='absolute left-3 top-5 -translate-y-1/2 text-gray-600 z-10 pointer-events-none'>
              ریال
            </span>

            <Controller
              name='amount'
              control={control}
              rules={{ required: t('panel:amount_required') }}
              render={({ field }) => {
                const toPersianDigits = (num: string | number) =>
                  num.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

                const formatValue = (val: number | undefined) => {
                  if (val === undefined || val === null) return '';
                  const withCommas = val.toLocaleString('en-US');
                  return toPersianDigits(withCommas);
                };

                return (
                  <>
                    <input
                      type='text'
                      value={formatValue(field.value)}
                      placeholder={t('panel:amount')}
                      className={`bg-white w-full border rounded-lg p-2 pl-12 text-left
                focus:outline-none focus:ring-2 ${
                  errors.amount
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-blue-500'
                } placeholder:text-right`}
                      style={{ direction: 'ltr' }}
                      onChange={(e) => {
                        const rawValue = e.target.value.trim();
                        if (rawValue === '') {
                          field.onChange(undefined);
                          return;
                        }

                        const numericValue = Number(
                          rawValue
                            .replace(/[۰-۹]/g, (d) =>
                              String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)),
                            )
                            .replace(/,/g, ''),
                        );
                        field.onChange(
                          isNaN(numericValue) ? undefined : numericValue,
                        );
                      }}
                    />

                    {/* عدد به حروف زیر input */}
                    {field.value !== undefined && field.value !== null && (
                      <p className='text-gray-600 mt-1 text-sm'>
                        {numberToPersianWords(field.value)} ریال
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>

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
