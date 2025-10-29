'use client';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export const BannerSection = () => {
  const { t } = useTranslation();

  return (
    <div className='mb-[88px] px-6 md:px-0'>
      <div className='max-w-4xl mx-auto py-4 px-4 md:px-12 rounded-2xl bg-primary mb-4'>
        <h1 className='sr-only'>عنوان اصلی صفحه یا اسلایدر</h1>

        <div className='flex md:justify-between items-center'>
          <div>
            <h2 className='text-white font-bold text-[24px] md:text-[26px] mb-4'>
              {t('home:dental_plan')}
            </h2>

            <p className='text-white font-bold text-[14px] md:text-[20px] mb-6 '>
              {t('home:dental_plan_recipient')}
            </p>
          </div>

          <Image
            src='/assets/home-image/banner-image.svg'
            alt='banner-image'
            width={262}
            height={262}
            className='hidden md:block'
          />
        </div>
      </div>
      <div className='custom-pagination mt-4 flex justify-center'></div>
    </div>
  );
};
