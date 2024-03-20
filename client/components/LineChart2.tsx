import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import React from 'react';
import { MetricsData } from '../../types';

type ChartDataSingle = {
  time: string;
  value: number;
};

export default function LineChart2({ metric, value, time }: MetricsData) {
  // const data = [
  //   { name: 'Page A', uv: 400 },
  //   { name: 'Page B', uv: 300 },
  //   { name: 'Page C', uv: 300 },
  //   { name: 'Page D', uv: 200 },
  //   { name: 'Page E', uv: 100 },
  // ];
  const data: ChartDataSingle[] = [];

  for (let i = 0; i < time.length; i++) {
    data.push({ time: time[i], value: value[i] });
  }

  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="kalegreen" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time.length" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
