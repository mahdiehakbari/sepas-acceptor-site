import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DateObject from 'react-date-object';
import { Button } from '@/sharedComponent/ui/Button/Button';

export interface IFilteredProps {
  planName: string;
  setPlanName: (value: string) => void;
  fromDate: DateObject | null;
  setFromDate: (value: DateObject | null) => void;
  toDate: DateObject | null;
  setToDate: (value: DateObject | null) => void;
  handleFilter: () => void;
  isFilterButtonDisabled: boolean;
  placeholderText: string;
}

export const Filteredtabel = ({
  planName,
  setPlanName,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  handleFilter,
  isFilterButtonDisabled,
  placeholderText,
}: IFilteredProps) => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
      <div className='w-full'>
        <input
          type='text'
          placeholder={placeholderText}
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className='border border-border-color rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-400'
        />
      </div>

      <div className='w-full'>
        <DatePicker
          value={fromDate}
          onChange={(date) => setFromDate(date ?? null)}
          calendar={persian}
          locale={persian_fa}
          maxDate={today}
          onOpenPickNewDate={false}
          render={(value, openCalendar) => (
            <div
              className='border border-gray-300 rounded-md w-full px-3 py-2 flex items-center justify-between cursor-pointer'
              onClick={openCalendar}
            >
              <span className='truncate'>{value || 'انتخاب تاریخ'}</span>

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
              </div>
            </div>
          )}
        />
      </div>

      <div className='w-full'>
        <DatePicker
          value={toDate}
          onChange={(date) => setToDate(date ?? null)}
          calendar={persian}
          locale={persian_fa}
          maxDate={today}
          onOpenPickNewDate={false}
          render={(value, openCalendar) => (
            <div
              className='border border-gray-300 rounded-md w-full px-3 py-2 flex items-center justify-between cursor-pointer'
              onClick={openCalendar}
            >
              <span className='truncate'>{value || 'انتخاب تاریخ'}</span>

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
              </div>
            </div>
          )}
        />
      </div>

      <div className='w-full flex items-end'>
        <Button
          onClick={handleFilter}
          disabled={isFilterButtonDisabled}
          className={`w-full ${
            isFilterButtonDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          فیلتر
        </Button>
      </div>
    </div>
  );
};
