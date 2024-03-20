import React, { lazy } from 'react';
import GaugeChart from './GaugeChart';
import LineChart from './LineChart';
import { MetricsData } from '../../types';

type ChartTableProps = {
  metrics: { [key: string]: MetricsData };
};

export default function ChartTable({ metrics }: ChartTableProps) {
  const lineChartArr: JSX.Element[] = [];
  const gaugeChartArr: JSX.Element[] = [];

  for (let i = 0; i < Object.keys(metrics).length; i++) {
    lineChartArr.push(
      <LineChart
        metric={Object.keys(metrics)[i]}
        value={metrics[Object.keys(metrics)[i]].value}
        time={metrics[Object.keys(metrics)[i]].time}
        key={i}
      />
    );
  }
  for (let i = 0; i < Object.keys(metrics).length; i++) {
    gaugeChartArr.push(
      <GaugeChart
        metric={Object.keys(metrics)[i]}
        value={
          metrics[Object.keys(metrics)[i]].value[
            metrics[Object.keys(metrics)[i]].value.length - 1
          ]
        }
        time={
          metrics[Object.keys(metrics)[i]].time[
            metrics[Object.keys(metrics)[i]].time.length - 1
          ]
        }
        key={i}
      />
    );
  }
  return (
    <div>
      <div>{gaugeChartArr}</div>
      <div>{lineChartArr}</div>
    </div>
  );
}
