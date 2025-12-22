import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Button } from '@/sharedComponent/ui/Button/Button';
import Select, { components, MultiValue, OptionProps } from 'react-select';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { IFilteredProps, ISelectOption } from './types';

const CheckboxOption = (props: OptionProps<ISelectOption, true>) => (
  <components.Option {...props}>
    <input type='checkbox' checked={props.isSelected} readOnly /> {props.label}
  </components.Option>
);
export const ReceiptsFilter = ({
  acceptorName,
  setAcceptorName,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  handleFilter,
  acceptorData,
  handleRemoveFilter,
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

  return (
    <div className='p-6 md:w-[465px]'>
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

      <div className='w-full  mb-5'>
        <DatePicker
          value={fromDate}
          onChange={(date) => setFromDate(date ?? null)}
          calendar={persian}
          locale={persian_fa}
          maxDate={today}
          portal
          className='w-full'
          containerClassName='w-full'
          placeholder={t('panel:from_date')}
          onOpenPickNewDate={false}
          render={(value, openCalendar) => (
            <div
              className='border border-gray-300 rounded-md w-full px-3 py-2 flex items-center justify-between cursor-pointer'
              onClick={openCalendar}
            >
              <span className='truncate'>{value || t('panel:from_date')}</span>

              <div className='flex items-center gap-2'>
                {value && (
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      setFromDate(null);
                    }}
                    className='text-gray-400 hover:text-red-500 text-lg leading-none'
                  >
                    ×
                  </button>
                )}

                <Image
                  src='/assets/icons/calendar.svg'
                  alt='calendar'
                  width={20}
                  height={20}
                />
              </div>
            </div>
          )}
        />
      </div>

      <div className='w-full  mb-5'>
        <DatePicker
          value={toDate}
          onChange={(date) => setToDate(date ?? null)}
          calendar={persian}
          locale={persian_fa}
          maxDate={today}
          portal
          className='w-full'
          containerClassName='w-full'
          placeholder={t('panel:to_date')}
          onOpenPickNewDate={false}
          render={(value, openCalendar) => (
            <div
              className='border border-gray-300 rounded-md w-full px-3 py-2 flex items-center justify-between cursor-pointer'
              onClick={openCalendar}
            >
              <span className='truncate'>{value || t('panel:to_date')}</span>

              <div className='flex items-center gap-2'>
                {value && (
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      setToDate(null);
                    }}
                    className='text-gray-400 hover:text-red-500 text-lg leading-none'
                  >
                    ×
                  </button>
                )}

                <Image
                  src='/assets/icons/calendar.svg'
                  alt='calendar'
                  width={20}
                  height={20}
                />
              </div>
            </div>
          )}
        />
      </div>

      <div className='flex justify-between gap-4'>
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
