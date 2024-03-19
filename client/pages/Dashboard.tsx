import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GaugeChart from '../components/GaugeChart';
import NavBar from '../components/Navbar';
import LineChart from '../components/LineChart';
import { MetricsState, MetricsData } from '../../types.d';
import { RootState } from '../slices/store';
import { useGetMetricsQuery } from '../slices/metricsApi';

export default function Dashboard() {
  const {
    data: currentData,
    error,
    isLoading,
  } = useGetMetricsQuery(undefined, { pollingInterval: 60000 });

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
    <>
      <NavBar title="Dashboard" />
      {isLoading ? (
        <div>Data loading...</div>
      ) : currentData ? (
        <div className="w-full grid grid-cols-6 grid-rows-2 gap-3 place-content-center">
          <div className="h-80 max-w-full content-center">
            <p className="text-lg font-semibold text-center">Name of GPU</p>
            <p className="font-serif text-xl text-center font-bold h-full p-3">
              {currentData.name}
            </p>
          </div>
          <div className="h-64 max-w-full content-center">
            <p className="text-lg font-semibold text-center">Driver Version</p>
            <p className="font-serif text-xl text-center font-bold h-full p-3">
              {currentData.driverVersion}
            </p>
          </div>
          <div className="h-64 max-w-full col-span-2">{guageChartArr[0]}</div>
          <div className="h-64 max-w-full col-span-2 col-start-5">
            {guageChartArr[1]}
          </div>
          <div className="h-96 max-w-full col-span-3 row-start-2">
            {lineChartArr[0]}
          </div>
          <div className="h-96 max-w-full col-span-3 col-start-4 row-start-2">
            {lineChartArr[1]}
          </div>
        </div>
      ) : null}
    </>
  );
}
