import React, { lazy } from 'react';
import GuageChart from './GuageChart';
import { MetricsData } from '../../types';
import LineChart2 from './LineChart2';

type ChartTableProps = {
  metrics: { [key: string]: MetricsData };
};

export default function ChartTable({ metrics }: ChartTableProps) {
  const lineChartArr: JSX.Element[] = [];
  const gaugeChartArr: JSX.Element[] = [];

  for (let i = 0; i < Object.keys(metrics).length; i++) {
    lineChartArr.push(
      <LineChart2
        metric={Object.keys(metrics)[i]}
        value={metrics[Object.keys(metrics)[i]].value}
        time={metrics[Object.keys(metrics)[i]].time}
        key={i}
        id={`line-chart-${i}`}
      />
    );
  }
  for (let i = 0; i < Object.keys(metrics).length; i++) {
    const val =
      metrics[Object.keys(metrics)[i]].value[
        metrics[Object.keys(metrics)[i]].value.length - 1
      ];
    console.log(val);
    gaugeChartArr.push(
      <GuageChart
        metric={Object.keys(metrics)[i]}
        value={val !== undefined ? +val.toFixed(4) : 0.2335}
        time={
          metrics[Object.keys(metrics)[i]].time[
            metrics[Object.keys(metrics)[i]].time.length - 1
          ]
        }
        key={i}
        id={`gauge-chart-${i}`}
      />
    );
  }
  return (
    <>
      <div className="flex max-w-screen-xl flex-wrap items-center justify-start mx-6 my-6">
        {gaugeChartArr}
      </div>

      <div className="flex max-w-screen-xl flex-wrap items-center justify-start mx-6 my-6">
        {lineChartArr[0]}
        {lineChartArr[0]}
      </div>
    </>
  );
}
