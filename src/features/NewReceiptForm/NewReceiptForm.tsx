'use client';
import { useForm, Controller } from 'react-hook-form';
import { TFormValues } from './types';
import { NumericFormat } from 'react-number-format';
import { Button } from '@/sharedComponent/ui/Button/Button';
import { useTranslation } from 'react-i18next';

export const NewReceiptForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: { phoneNumber: '', amount: undefined },
  });

  const onSubmit = (data: TFormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <div className='mb-5'>
          <input
            type='tel'
            placeholder={t('panel:patient_mobile')}
            {...register('phoneNumber', { required: true, maxLength: 11 })}
            className={`bg-white w-full border rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 text-left placeholder:text-right ${
              errors.phoneNumber
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.phoneNumber && (
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
          ثبت
        </Button>
      </form>
    </div>
  );
};
