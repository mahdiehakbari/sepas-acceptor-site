'use client';
import { NewReceiptForm } from '@/features/NewReceiptForm/NewReceiptForm';
import { useTranslation } from 'react-i18next';

const NewReceipt = () => {
  const { t } = useTranslation();

  return (
    <div className=" h-screen bg-[url('/assets/icons/bg-image.svg')] bg-cover bg-center flex items-center justify-center">
      <div className='bg-(--second-light-primary) p-6 rounded-2xl md:w-[438px]'>
        <p className='text-black text-[16px] font-medium mb-5'>
          {t('panel:information_required')}
        </p>
        <NewReceiptForm />
      </div>
    </div>
  );
};

export default NewReceipt;
