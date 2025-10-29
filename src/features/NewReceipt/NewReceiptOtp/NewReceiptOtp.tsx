'use client';

import {
  API_PURCHASE_REQUESTS_COMMAND,
  API_PURCHASE_REQUESTS_VERIFY,
} from '@/config/api_address.config';
import { formatTime } from '@/sharedComponent/lib/formatTime';
import { Button } from '@/sharedComponent/ui/Button/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OTPInput from 'react-otp-input';
import Cookies from 'js-cookie';
import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';
import { INewReceiptOtpProps } from './types';

export const NewReceiptOtp = ({
  phoneNumber,
  amountNumber,
  setShowModalResult,
  setErrorResult,
  setResultData,
}: INewReceiptOtpProps) => {
  const [otp, setOtp] = useState('');
  const { t } = useTranslation();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const [apiError, setApiError] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const token = Cookies.get('token');
  const purchaseRequestId = Cookies.get('purchaseRequestId');

  const handleResend = async () => {
    setOtp('');
    setTimeLeft(120);
    setCanResend(false);
    setApiError('');
    try {
      await axios
        .post(
          API_PURCHASE_REQUESTS_COMMAND,
          {
            customerPhoneNumber: phoneNumber,
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
          setOtp('');
          setError('');
        })
        .catch(() => {});
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setApiError(err.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerify = () => {
    setButtonLoading(true);
    axios
      .post(
        API_PURCHASE_REQUESTS_VERIFY,
        {
          purchaseRequestId: purchaseRequestId,
          otpCode: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((resp) => {
        setResultData(resp.data);
        setShowModalResult(true);
        setErrorResult('');
        setButtonLoading(false);
      })
      .catch((err: unknown) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'خطایی رخ داده است.');
          setShowModalResult(true);
          setErrorResult(err.response?.data?.message);
          setButtonLoading(false);
        }
      });
  };
  useEffect(() => {
    if (otp.length === 6) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleVerify();
    }
  }, [otp]);
  return (
    <div className='md:w-[600px]'>
      <div className='p-6'>
        <h2 className='text-[18px] font-bold mb-6'>
          {t('panel:customer_otp')}
        </h2>
        <div dir='ltr' className='flex justify-center'>
          <OTPInput
            value={otp}
            onChange={(val) => setOtp(val.replace(/[^0-9]/g, ''))}
            numInputs={6}
            inputType='tel'
            shouldAutoFocus
            containerStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
            }}
            renderInput={(props, index) => (
              <input
                {...props}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                dir='ltr'
                inputMode='numeric'
                className={`text-center text-lg border rounded-lg outline-none transition-all duration-150
                  ${
                    error
                      ? 'border-red-500'
                      : focusedIndex === index
                      ? 'border-blue-500 ring-1 ring-blue-400'
                      : 'border-gray-300'
                  }
                `}
                style={{
                  width: '44px',
                  height: '44px',
                  margin: '0px',
                }}
              />
            )}
          />
          {error && <p className='text-red-500 text-sm my-2 mr-4'>{error}</p>}
          {apiError && (
            <p className='text-red-500 text-sm my-2 mr-4'>{apiError}</p>
          )}
        </div>

        <div className='flex justify-center items-center mt-4 gap-2 text-sm'>
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`cursor-pointer font-semibold ${
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
          {buttonLoading == true ? <SpinnerDiv /> : t('panel:confirmation')}
        </Button>
      </div>
    </div>
  );
};
