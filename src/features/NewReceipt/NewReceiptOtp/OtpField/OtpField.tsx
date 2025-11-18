import OTPInput from 'react-otp-input';
import React from 'react';
import { TOtpFieldProps } from './types';

export const OtpField: React.FC<TOtpFieldProps> = ({
  otp,
  setOtp,
  error,
  focusedIndex,
  setFocusedIndex,
}) => {
  return (
    <div dir='ltr' className='flex flex-col justify-center items-center gap-2'>
      <OTPInput
        value={otp}
        onChange={(val) => setOtp(val.replace(/[^0-9]/g, ''))}
        numInputs={6}
        inputType='tel'
        shouldAutoFocus
        containerStyle={{ display: 'flex', gap: '8px' }}
        renderInput={(props, index) => (
          <input
            {...props}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            inputMode='numeric'
            className={`text-center text-lg border rounded-lg outline-none transition-all duration-150
${
  error
    ? 'border-red-500'
    : focusedIndex === index
    ? 'border-blue-500 ring-1 ring-blue-400'
    : 'border-gray-300'
}`}
            style={{ width: '44px', height: '44px' }}
          />
        )}
      />

      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};
