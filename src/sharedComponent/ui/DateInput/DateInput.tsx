import React, { useState, useEffect } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { IDateInputProps } from './types';

export const DateInput = <T extends FieldValues>({
  control,
  name,
  label,
  errors,
  rules,
  textError,
  defaultValue,
  disabled,
}: IDateInputProps<T> & { defaultValue?: string }) => {
  const hasError = !!errors[name];

  const [pickerValue, setPickerValue] = useState<DateObject | undefined>();

  useEffect(() => {
    if (defaultValue && !isNaN(Date.parse(defaultValue))) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPickerValue(new DateObject(defaultValue));
    }
  }, [defaultValue]);

  return (
    <div className='flex flex-col'>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={
          defaultValue && !isNaN(Date.parse(defaultValue))
            ? defaultValue
            : undefined
        }
        render={({ field }) => (
          <DatePicker
            disabled={disabled}
            value={pickerValue}
            onChange={(date) => {
              if (date instanceof DateObject) {
                setPickerValue(date);
                field.onChange(date.format('YYYY-MM-DD'));
              } else {
                setPickerValue(undefined);
                field.onChange(undefined);
              }
            }}
            calendar={persian}
            locale={persian_fa}
            onOpenPickNewDate={false}
            calendarPosition='bottom-right'
            render={(value, openCalendar) => (
              <div
                className={`w-full bg-white border rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer
        focus:outline-none
        ${
          disabled ? 'bg-gray-100 cursor-default opacity-70 text-[#9b9b9b]' : ''
        }
        ${hasError ? 'border-red-500' : 'border-gray-300'}`}
                onClick={!disabled ? openCalendar : undefined}
              >
                <span className='truncate text-right'>
                  {value || `${label} *`}
                </span>

                <div className='flex items-center gap-2'>
                  {value && !disabled && (
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        setPickerValue(undefined);
                        field.onChange(undefined);
                      }}
                      className='text-gray-400 hover:text-red-500 text-lg leading-none'
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            )}
          />
        )}
      />

      {hasError && (
        <span className='text-red-500 text-sm mt-1'>
          {errors[name]?.message?.toString() || textError}
        </span>
      )}
    </div>
  );
};
