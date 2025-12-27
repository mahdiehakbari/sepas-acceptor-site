import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export interface ISelectInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  options: { label: string; value: string }[];
  errors?: FieldErrors<T>;
  onChange?: (value: string | string[]) => void;
  rules?: RegisterOptions<T, Path<T>>;
  defaultValue?: string | string[];
  value?: string | string[];
  disabled?: boolean;
  isMulti?: boolean;
}
