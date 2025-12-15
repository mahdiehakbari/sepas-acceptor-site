'use client';
import { useTranslation } from 'react-i18next';

export const ContentComponent = () => {
  const { t } = useTranslation();
  return (
    <div className='max-w-4xl mx-auto mb-28  px-6 md:px-10'>
      <h3 className='text-black font-bold text-[16px] mb-5'>
        {t('home:notice')}
      </h3>
      <p className='text-black font-medium text-[16px] mb-5'>
        {t('home:register_patient_payments')}
      </p>
      <p className='text-black font-medium text-[16px] mb-5'>
        شماره تماس پشتیبانی: ۷۹۵۷۲۰۰۰-۰۲۱
      </p>
    </div>
  );
};
