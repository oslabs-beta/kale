import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GaugeChart from '../components/GaugeChart';
import NavBar from '../components/Navbar';
import LineChart from '../components/LineChart';
//import { MetricsState, MetricsData } from '../../types.d';
import { RootState } from '../slices/store';
import { useGetMetricsQuery } from '../slices/metricsApi';

export default function Dashboard() {
  const { data: currentData, error, isLoading } = useGetMetricsQuery();

  const lineChartArr: JSX.Element[] = [];
  const guageChartArr: JSX.Element[] = [];

  if (currentData) {
    for (let i = 0; i < currentData.metrics.length; i++) {
      lineChartArr.push(
        <LineChart
          name={currentData.metrics[i].name}
          value={currentData.metrics[i].value}
          time={currentData.metrics[i].time}
          key={i}
        />
      );
    }
    for (let i = 0; i < currentData.metrics.length; i++) {
      guageChartArr.push(
        <GaugeChart
          name={currentData.metrics[i].name}
          value={
            currentData.metrics[i].value[
              currentData.metrics[i].value.length - 1
            ]
          }
          time={
            currentData.metrics[i].time[currentData.metrics[i].time.length - 1]
          }
          key={i}
        />
      );
    }
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <h1>Dashboard</h1>
      {isLoading ? (
        <div>Data loading...</div>
      ) : currentData ? (
        <>
          <p>Name of GPU: {currentData.name}</p>
          <p>Driver Version: {currentData.driverVersion}</p>
          <div>{guageChartArr}</div>
          <div>{lineChartArr}</div>
        </>
      ) : null}
    </div>
  );
}

  //MOCK DATA
  // console.log(
  //   JSON.stringify({
  //     name: 'NVIDIA GeForce RTX 3080',
  //     driverVersion: 465.19,
  //     metrics: [
  //       {
  //         name: 'GPU Utilization',
  //         time: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //         value: Array.from({ length: 10 }, () => Math.random().toFixed(2)),
  //       },
  //       {
  //         name: 'Power Draw',
  //         time: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //         value: Array.from({ length: 10 }, () => Math.random().toFixed(2)),
  //       },
  //       {
  //         name: 'Temperature',
  //         time: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //         value: Array.from({ length: 10 }, () => Math.random().toFixed(2)),
  //       },
  //       {
  //         name: 'Memory Utilization',
  //         time: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //         value: Array.from({ length: 10 }, () => Math.random().toFixed(2)),
  //       },
  //     ],
  //   })
  // );