'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import type { Payload } from 'recharts/types/component/DefaultTooltipContent';

interface ChartItem {
  day: number;
  value: number;
}

const data: ChartItem[] = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  value: Math.floor(Math.random() * 900) + 100,
}));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) return null;

  const firstPayload = payload[0] as Payload<number, string>;
  if (firstPayload.value === undefined) return null;

  return (
    <div className='bg-gray-700 text-white text-sm px-3 py-1 rounded-lg shadow'>
      {firstPayload.value.toLocaleString('fa-IR')}ریال
    </div>
  );
};

export default function BarExample() {
  return (
    <div className='w-full h-72 bg-white rounded-xl pr-6'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data}>
          <XAxis dataKey='day' tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
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
}
