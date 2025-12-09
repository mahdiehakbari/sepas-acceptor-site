import { FieldValues } from 'react-hook-form';

interface ISimpleSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

export const SimpleSelect = ({
  label,
  value,
  onChange,
  options,
  disabled,
}: ISimpleSelectProps) => {
  return (
    <div className='flex flex-col'>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className='bg-white border border-gray-300 rounded-lg px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        <option value=''>{label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
