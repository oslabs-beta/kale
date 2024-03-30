import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { timeseriesMetric } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// type ChartDataSingle = {
//   time: string;
//   value: number;
// };

export default function LineChart2({ name, value, time }: timeseriesMetric) {
  // const data = [
  //   { name: 'Page A', uv: 400 },
  //   { name: 'Page B', uv: 300 },
  //   { name: 'Page C', uv: 300 },
  //   { name: 'Page D', uv: 200 },
  //   { name: 'Page E', uv: 100 },
  // ];

  const data = {
    labels: time,
    datasets: [
      {
        label: name,
        data: value.map((val) => +(+val * 100).toFixed(2)),
        borderColor: '#3AD48F',
        backgroundColor: '#1E8A5A',
      },
    ],
  };

  return (
    <div className="flex flex-col h-auto w-1/2 items-center justify-center p-8">
      <p className="text-lg text-center dark:text-kalegreen-300">{name}</p>
      <Line data={data} />
    </div>
    // <LineChart
    //   width={730}
    //   height={250}
    //   data={data}
    //   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    // >
    //   <CartesianGrid strokeDasharray="3 3" />
    //   <XAxis dataKey="time" />
    //   <YAxis />
    //   <Tooltip />
    //   <Legend />
    //   <Line type="monotone" dataKey="%" stroke="#8884d8" />
    // </LineChart>
  );
}
