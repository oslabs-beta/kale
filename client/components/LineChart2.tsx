import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import React from 'react';
import { MetricsData } from '../../types';

export default function LineChart2({ metric, value, time }: MetricsData) {
  const data = [
    { name: 'Page A', uv: 400 },
    { name: 'Page B', uv: 300 },
    { name: 'Page C', uv: 300 },
    { name: 'Page D', uv: 200 },
    { name: 'Page E', uv: 100 },
  ];
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="time.length" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}
