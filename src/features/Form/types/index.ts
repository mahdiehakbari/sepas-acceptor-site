import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';

export type { IProfileFormValues };

export interface IUpdateProfileValues {
  email?: string;
  iban?: string;
  address: string;
  workPlacePhoneNumber: string;
  cityId: string;
  postalCode: string;
  bio: string;
  skillIds?: string[];
}

export interface IProfileFormProps {
  userData?: IProfileFormValues | null;
  setUser?: Dispatch<SetStateAction<IProfileFormValues>>;
  name: string;
  handleBack: () => void;
  onSuccess?: (updatedUser: IProfileFormValues) => void;
  setShowProfileModal?: ((value: boolean) => void) | null;
  setShowCreditNoteModal?: (value: boolean) => void;
  setIsEditing?: (value: boolean) => void;
}

export interface IPersonalInfoSectionProps {
  userData?: IProfileFormValues | null;
  t: (key: string) => string;
  register: UseFormRegister<IProfileFormValues>;
  errors: FieldErrors<IProfileFormValues>;
  control: Control<IProfileFormValues>;
  phoneNumber: string;
  setValue: UseFormSetValue<IProfileFormValues>;
}

export interface IBankInfoSectionProps {
  userData?: IProfileFormValues | null;
  t: (key: string) => string;
  register: UseFormRegister<IProfileFormValues>;
  errors: FieldErrors<IProfileFormValues>;
}

interface ILocationItem {
  id: string;
  name: string;
}

export interface IAddressInfoSectionProps {
  userData?: IProfileFormValues | null;
  t: (key: string) => string;
  register: UseFormRegister<IProfileFormValues>;
  errors: FieldErrors<IProfileFormValues>;
  provinces: ILocationItem[];
  cities: ILocationItem[];
  handleProvinceChange: (provinceId: string | number) => void;
}
