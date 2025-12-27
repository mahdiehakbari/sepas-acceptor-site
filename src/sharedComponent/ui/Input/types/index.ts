import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
interface IAddress {
  id: string;
  cityId: string;
  cityName: string;
  provinceId: string;
  provinceName: string;
  // details: string;
  postalCode: string;

  workPlacePhoneNumber: string;
  merchantAddress: string;
}

export interface ISkill {
  id: string;
  description: string;
}

export interface IProfileFormValues {
  phoneNumber?: string;
  fullName?: string;
  firstName: string;
  lastName: string;
  mobile: string;
  nationalId: string;
  birthDate: string;
  gender: number | string;
  email?: string;
  iban?: string;
  province: string;
  cityId: string;
  postalCode: string;
  addressDetails: string;
  address?: IAddress;
  merchantId?: string;
  medicalSystemNumber: string;
  educationLevel: string | number;
  contractType: string | number;
  certificateNumber: string;
  workPlacePhoneNumber: string;
  merchantAddress: string;
  professionalTitle: string;
  bio: string;
  merchantBio: string;
  skillIds: string[];
  skills: ISkill[];
}

export interface InputProps<TFieldName extends keyof IProfileFormValues> {
  defaultValue: string;
  label: string;
  name: TFieldName;
  register: UseFormRegister<IProfileFormValues>;
  required?: boolean;
  type?: string;
  full?: boolean;
  errors: FieldErrors<IProfileFormValues>;
  textError: string;
  rules?: RegisterOptions<IProfileFormValues, TFieldName>;
  disabled?: boolean;
}

