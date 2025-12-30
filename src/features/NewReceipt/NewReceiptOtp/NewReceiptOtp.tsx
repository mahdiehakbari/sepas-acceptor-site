'use client';

import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { Button } from '@/sharedComponent/ui/Button/Button';
import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';
import { formatTime } from '@/sharedComponent/lib/formatTime';
import { INewReceiptOtpProps } from './types';
import { useCountdown } from './hooks/useCountdown';
import { resendOtpAPI, verifyOtpAPI } from './api/resendOtpAPI';
import { AxiosError } from 'axios';
import { OtpField } from './OtpField/OtpField';
import { toast } from 'react-toastify';

export const NewReceiptOtp: React.FC<INewReceiptOtpProps> = ({
  phoneNumber,
  amountNumber,
  setShowModalResult,
  setErrorResult,
  setResultData,
}) => {
  const { t } = useTranslation();

  const [otp, setOtp] = useState<string>('');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');
  const [canResend, setCanResend] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const token = Cookies.get('token');
  const purchaseRequestId = Cookies.get('purchaseRequestId') ?? '';

  const handleExpire = () => setCanResend(true);

  const { timeLeft, reset } = useCountdown(120, handleExpire);

  const handleResend = async (): Promise<void> => {
    toast.success(t('home:resend_otp'));
    if (!canResend) return;

    try {
      await resendOtpAPI(phoneNumber, amountNumber, token);
      setOtp('');
      reset();
      setCanResend(false);
      setError('');
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setApiError(axiosErr.response?.data?.message ?? 'خطا در ارسال مجدد کد');
    }
  };

  const handleVerify = async (): Promise<void> => {
    if (otp.length < 6) return;

    setButtonLoading(true);

    try {
      const resp = await verifyOtpAPI(purchaseRequestId, otp, token);
      setResultData(resp.data);
      setErrorResult('');
      setShowModalResult(true);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const msg = axiosErr.response?.data?.message ?? 'خطایی رخ داده است.';
      setError(msg);
      setErrorResult(msg);
    }

    setButtonLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (otp.length === 6) handleVerify();
  }, [otp]);

  return (
    <div className='md:w-[600px]'>
      <div className='p-6'>
        <h2 className='text-[18px] font-bold mb-6'>
          {t('panel:customer_otp')}
        </h2>

        <OtpField
          otp={otp}
          setOtp={setOtp}
          error={error}
          focusedIndex={focusedIndex}
          setFocusedIndex={setFocusedIndex}
        />

        {apiError && (
          <p className='text-red-500 text-sm text-center'>{apiError}</p>
        )}

        <div className='flex justify-center items-center mt-4 gap-2 text-sm'>
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`font-semibold ${
              canResend
                ? 'text-primary hover:underline'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            {t('login:resend_code')}
          </button>

          <span className='text-[#A5A5A5] text-[12px] font-bold'>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className='flex justify-end border-t border-[#E6E6E6] px-4 py-2'>
        <Button className='w-[78px]' onClick={handleVerify}>
          {buttonLoading ? <SpinnerDiv /> : t('panel:confirmation')}
        </Button>
      </div>
    </div>
  );
};
