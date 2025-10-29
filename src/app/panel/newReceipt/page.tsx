'use client';
import { NewReceiptForm } from '@/features/NewReceipt';
import { NewReceiptOtp } from '@/features/NewReceipt/NewReceiptOtp/NewReceiptOtp';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NewReceipt = () => {
  const { t } = useTranslation();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [purchaseRequestId, setPurchaseRequestId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amountNumber, setAmountNumber] = useState(0);

  return (
    <div className=" h-screen bg-[url('/assets/icons/bg-image.svg')] bg-cover bg-center flex items-center justify-center">
      <div className='bg-(--second-light-primary) p-6 rounded-2xl md:w-[438px]'>
        <p className='text-black text-[16px] font-medium mb-5'>
          {t('panel:information_required')}
        </p>
        <NewReceiptForm
          setPurchaseRequestId={setPurchaseRequestId}
          setShowOtpModal={setShowOtpModal}
          setPhoneNumber={setPhoneNumber}
          setAmountNumber={setAmountNumber}
        />

        <ResponsiveModal
          title={t('panel:otp')}
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
        >
          <NewReceiptOtp
            phoneNumber={phoneNumber}
            amountNumber={amountNumber}
            purchaseRequestId={purchaseRequestId}
          />
        </ResponsiveModal>
      </div>
    </div>
  );
};

export default NewReceipt;
