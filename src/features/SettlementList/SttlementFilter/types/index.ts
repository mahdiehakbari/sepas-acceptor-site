import { DateObject } from 'react-multi-date-picker';

export interface ISelectOption {
  label: string;
  value: string;
}

export interface IAcceptorData {
  firstName: string;
  id: string;
  lastName: string;
  nationalId: string;
}

export interface IMerchantData {
  businessName: string;
  firstName: string;
  id: string;
  lastName: string;
  nationalId: string;
}

export interface IFilteredProps {
  fromDate: DateObject | null;
  fromPaymentDate: DateObject | null;
  setFromDate: (value: DateObject | null) => void;
  setFromPaymentDate: (value: DateObject | null) => void;
  toPaymentDate: DateObject | null;
  toDate: DateObject | null;
  setToDate: (value: DateObject | null) => void;
  setToPaymentDate: (value: DateObject | null) => void;
  handleFilter: () => void;
  placeholderText: string;
  handleRemoveFilter: () => void;
}
