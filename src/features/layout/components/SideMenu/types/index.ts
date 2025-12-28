import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';

export type { IProfileFormValues };

export interface InputProps {
  label: string;
  name: keyof IProfileFormValues;
  register: UseFormRegister<IProfileFormValues>;
  required?: boolean;
  type?: string;
  full?: boolean;
  errors: FieldErrors<IProfileFormValues>;
  textError: string;
  rules?: RegisterOptions<IProfileFormValues, keyof IProfileFormValues>;
}
