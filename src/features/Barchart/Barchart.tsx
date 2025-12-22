'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

export interface ChartItem {
  day: number;
  value: number;
}

const CustomTooltip = ({
  active,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload || payload.length === 0) return null;

  const firstPayload = payload[0];
  if (firstPayload.value === undefined || firstPayload.value === null)
    return null;

  return (
    <div className='bg-gray-700 text-white text-sm px-3 py-1 rounded-lg shadow'>
      {Number(firstPayload.value).toLocaleString('fa-IR')} ریال
    </div>
  );
};

export const BarExample = ({ data }: { data: ChartItem[] }) => {
  return (
    <div className='w-full h-72 bg-white rounded-xl px-6'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data} margin={{ left: 40, right: 20 }}>
          <XAxis
            dataKey='day'
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => Number(value).toLocaleString('fa-IR')}
          />
          <YAxis
            tick={{ fontSize: 12, dx: -50 }}
            tickFormatter={(value) => Number(value).toLocaleString('fa-IR')}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey='value'
            fill='#2596FF'
            radius={[6, 6, 0, 0]}
            barSize={12}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
