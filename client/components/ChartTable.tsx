import React from 'react';
import GuageChart from './GuageChart';
import { timeseriesMetric } from '../../types';
import LineChart from './LineChart';

type ChartTableProps = {
  metrics: timeseriesMetric[];
};

export default function ChartTable({ metrics }: ChartTableProps) {
  const lineChartArr: JSX.Element[] = [];

  // creating line chart components
  for (let i = 0; i < Object.keys(metrics).length; i++) {
    lineChartArr.push(
      <LineChart
        name={Object.keys(metrics)[i]}
        value={metrics[i].value}
        time={metrics[i].time}
        key={i}
      />
    );
  }

  const gaugeChartArr: JSX.Element[] = [];

  // creating guage chart components
  for (let i = 0; i < metrics.length; i++) {
    const val = +metrics[i].value;
    gaugeChartArr.push(
      <GuageChart
        metric={metrics[i].name}
        value={metrics[i].value[metrics[i].value.length - 1]}
        time={metrics[i].time[metrics[i].time.length - 1]}
        key={i}
      />
    );
  }
  return (
    <>
      <div className="flex max-w-screen-xl flex-wrap items-center justify-start mx-6 my-6">
        {gaugeChartArr}
      </div>
      <div className="flex max-w-screen-xl flex-wrap items-center justify-start mx-6 my-6">
        {lineChartArr}
      </div>
    </>
  );
}
