'use client';
import {
  ModalResult,
  NewReceiptForm,
  NewReceiptOtp,
} from '@/features/NewReceipt';
import { PurchaseRequestResponse } from '@/features/NewReceipt/NewReceiptOtp/types';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NewReceipt = () => {
  const { t } = useTranslation();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showModalResult, setShowModalResult] = useState(false);
  const [purchaseRequestId, setPurchaseRequestId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amountNumber, setAmountNumber] = useState(0);
  const [errorResult, setErrorResult] = useState('');
  const [resultData, setResultData] = useState<PurchaseRequestResponse | null>(
    null,
  );

  const handleClose = () => {
    setShowModalResult(false);
    setShowOtpModal(false);
  };

  return (
    <div className="h-[-webkit-fill-available] bg-[url('/assets/icons/bg-image.svg')] bg-cover bg-center flex items-center justify-center">
      <div className='bg-(--second-light-primary) p-6 rounded-2xl md:w-[438px]'>
        <p className='text-black text-[16px] font-medium mb-5'>
          {t('panel:information_required')}
        </p>
        <NewReceiptForm
          setShowOtpModal={setShowOtpModal}
          setPhoneNumber={setPhoneNumber}
          setAmountNumber={setAmountNumber}
        />

        <ResponsiveModal
          title={showModalResult == false ? t('panel:otp') : undefined}
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
        >
          {showModalResult == true ? (
            <ModalResult
              errorResult={errorResult}
              handleClose={handleClose}
              resultData={resultData}
            />
          ) : (
            <NewReceiptOtp
              phoneNumber={phoneNumber}
              amountNumber={amountNumber}
              purchaseRequestId={purchaseRequestId}
              setErrorResult={setErrorResult}
              setShowModalResult={setShowModalResult}
              setResultData={setResultData}
            />
          )}
        </ResponsiveModal>
      </div>
    </div>
  );
};

export default NewReceipt;
