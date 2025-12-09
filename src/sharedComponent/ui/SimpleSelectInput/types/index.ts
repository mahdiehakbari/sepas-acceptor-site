import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface ISimpleSelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  disabled?: boolean;
}
