import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Button } from '@/sharedComponent/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { IFilteredProps, ISelectOption } from './types';
import Select, { components, MultiValue, OptionProps } from 'react-select';
const CheckboxOption = (props: OptionProps<ISelectOption, true>) => (
  <components.Option {...props}>
    <input type='checkbox' checked={props.isSelected} readOnly /> {props.label}
  </components.Option>
);
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
  acceptorName,
  setAcceptorName,
  acceptorData,
  referenceNumber,
  setReferenceNumber,
}: IFilteredProps) => {
  const { t } = useTranslation();
  const uniqueCustomers: ISelectOption[] = acceptorData.map((item) => ({
    label: `${item.firstName} ${item.lastName} - ${item.nationalId}`,
    value: item.id,
  }));

  const persianToEnglish = (str: string) => {
    return str.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
  };

  const englishToPersian = (str: string) => {
    return str.replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
  };

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const renderDatePicker = (
    value: DateObject | null,
    onChange: (date: DateObject | null) => void,
    placeholder: string,
    maxDate?: Date
  ) => (
    <DatePicker
      value={value}
      onChange={onChange}
      calendar={persian}
      locale={persian_fa}
       maxDate={maxDate}
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
      <div className='w-full mb-5'>
        <input
          type='text'
          value={englishToPersian(referenceNumber ?? '')}
          onChange={(e) => {
            const val = e.target.value;
            const english = persianToEnglish(val);
            setReferenceNumber(english);
          }}
          placeholder={t('panel:tracking_number')}
          className='border border-border-color w-full h-[38px] px-3 rounded-sm outline-0 placeholder:text-right'
          dir='ltr'
          inputMode='numeric'
        />
      </div>

      <div className='w-full mb-5'>
        <Select
          options={uniqueCustomers}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option: CheckboxOption }}
          onChange={(val: MultiValue<{ label: string; value: string }>) =>
            setAcceptorName([...val])
          }
          value={acceptorName}
          placeholder={t('transaction:customer_name')}
          styles={{
            valueContainer: (base) => ({
              ...base,
              display: 'flex',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              maxHeight: '38px',
            }),
            multiValue: (base) => ({
              ...base,
              whiteSpace: 'nowrap',
            }),
          }}
        />
      </div>
      <div className='mb-4'>
        {renderDatePicker(
          fromPaymentDate,
          setFromPaymentDate,
          'از تاریخ تسویه',
        )}
      </div>
      {renderDatePicker(toPaymentDate, setToPaymentDate, 'تا تاریخ تسویه')}

      <div className='mb-4'>
        {renderDatePicker(
          fromDate,
          setFromDate,
          'از تاریخ تراکنش',
          today
        )}
      </div>
      {renderDatePicker(
        toDate,
        setToDate,
        'تا تاریخ تراکنش',
        today
      )}

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
