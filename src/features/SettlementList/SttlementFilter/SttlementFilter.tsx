import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Button } from '@/sharedComponent/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { IFilteredProps } from './types';

export const SettlementFilter = ({
  fromPaymentDate,
  setFromPaymentDate,
  toPaymentDate,
  setToPaymentDate,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  handleFilter,
  handleRemoveFilter,
}: IFilteredProps) => {
  const { t } = useTranslation();

  const renderDatePicker = (
    value: DateObject | null,
    onChange: (date: DateObject | null) => void,
    placeholder: string,
  ) => (
    <DatePicker
      value={value}
      onChange={onChange}
      calendar={persian}
      locale={persian_fa}
      maxDate={new Date()}
      portal
      className='w-full'
      containerClassName='w-full'
      inputClass='border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-400'
      placeholder={placeholder}
      render={(val, openCalendar) => (
        <div
          className='border border-gray-300 rounded-md w-full px-3 py-2 flex items-center justify-between cursor-pointer'
          onClick={openCalendar}
        >
          <span>{val || placeholder}</span>
          <Image
            src='/assets/icons/calendar.svg'
            alt='calendar'
            width={20}
            height={20}
          />
        </div>
      )}
    />
  );

  return (
    <div className='p-6 md:w-[465px] space-y-5'>
      <div className='mb-4'>
        {renderDatePicker(
          fromPaymentDate,
          setFromPaymentDate,
          'از تاریخ تسویه',
        )}
      </div>
      {renderDatePicker(toPaymentDate, setToPaymentDate, 'تا تاریخ تسویه')}

      <div className='mb-4'>
        {renderDatePicker(fromDate, setFromDate, 'از تاریخ تراکنش')}
      </div>
      {renderDatePicker(toDate, setToDate, 'تا تاریخ تراکنش')}

      <div className='flex justify-between gap-4 mt-4'>
        <Button
          variant='outline'
          onClick={handleRemoveFilter}
          className='w-[199px]'
        >
          {t('panel:remove_filter')}
        </Button>
        <Button onClick={handleFilter} className='w-[199px]'>
          {t('panel:get_report')}
        </Button>
      </div>
    </div>
  );
};
