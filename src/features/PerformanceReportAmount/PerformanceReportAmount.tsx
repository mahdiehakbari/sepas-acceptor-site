import Image from 'next/image';
import { PerformanceAmountProps } from './types';

const PerformanceReportAmount = ({
  image,
  title,
  amount,
  isLast,
}: PerformanceAmountProps) => {
  return (
    <div
      className={`
        px-4 w-full md:w-1/3 py-4 md:py-0
        ${!isLast ? 'border-b border-(--border-blue)' : ''}
        ${!isLast ? 'md:border-l md:border-(--border-blue) md:border-b-0' : ''}
      `}
    >
      <p className='font-normal text-[16px] text-(--second-text-gray)'>
        {title}
      </p>

      <div className='flex items-center justify-between gap-11'>
        <div className='flex items-center gap-1'>
          <p className='font-bold text-2xl text-black'>{amount}</p>
          <p className='font-normal text-[16px] text-(--second-text-gray)'>
            ریال
          </p>
        </div>

        <Image src={image} alt={title} width={44} height={44} />
      </div>
    </div>
  );
};

export default PerformanceReportAmount;
