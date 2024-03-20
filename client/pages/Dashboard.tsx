import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../slices/store';
import GaugeChart from '../components/GaugeChart';
import NavBar from '../components/Navbar';
import LineChart from '../components/LineChart';
import {
  useGetMetricsQuery,
  useSendSnapshotsMutation,
} from '../slices/metricsApi';
import LineChart2 from '../components/LineChart2';
import SnapshotButton from '../components/SnapshotButton';
import GuageChart2 from '../components/GuageChart2';

export default function Dashboard() {
  const urlShow = useSelector((state: RootState) => state.metrics.input);
  const {
    data: currentData,
    error,
    isLoading,
  } = useGetMetricsQuery(undefined, { pollingInterval: 60000 });
  const [createSnapshot] = useSendSnapshotsMutation();

  const lineChartArr: JSX.Element[] = [];
  const guageChartArr: JSX.Element[] = [];

  if (currentData) {
    for (let i = 0; i < Object.keys(currentData.metrics).length; i++) {
      lineChartArr.push(
        <LineChart
          metric={
            currentData.metrics[Object.keys(currentData.metrics)[i]].metric
          }
          value={currentData.metrics[Object.keys(currentData.metrics)[i]].value}
          time={currentData.metrics[Object.keys(currentData.metrics)[i]].time}
          key={i}
        />
      );
    }
    for (let i = 0; i < Object.keys(currentData.metrics).length; i++) {
      guageChartArr.push(
        <GaugeChart
          metric={currentData.metrics[i].metric}
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

  function handleClick(data: any) {
    try {
      //console.log(currentData);
      const response = createSnapshot(currentData);
      console.log('data created!', response);
    } catch (error) {
      console.log('error saving data:', error);
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
            <p className="text-lg font-semibold text-center text-white">
              Cluster URL: {urlShow}
            </p>
            <p className="text-lg font-semibold text-center text-white">
              Name of GPU
            </p>
            <p className="font-serif text-xl text-center font-bold h-full p-3 text-white">
              NVIDIA GeForce RTX 3080
            </p>
          </div>
          <div className="h-64 max-w-full content-center">
            <p className="text-lg font-semibold text-center text-white">
              Driver Version
            </p>
            <p className="font-serif text-xl text-center font-bold h-full p-3 text-white">
              465.19
            </p>
            <SnapshotButton handleClick={() => handleClick(currentData)} />
          </div>
          <div className="h-64 max-w-full col-span-2">{guageChartArr[0]}</div>
          <div className="h-64 max-w-full col-span-2 col-start-5">
            {guageChartArr[1]}
          </div>
          <div className="h-64 max-w-full col-span-2 col-start-5">
            <GuageChart2 />
          </div>
          {/* <div className="h-96 max-w-full col-span-3 row-start-2">
            {lineChartArr[0]}
          </div>
          <div className="h-96 max-w-full col-span-3 col-start-4 row-start-2">
            {lineChartArr[1]}
          </div> */}
          <div className="h-96 max-w-full col-span-3 col-start-4 row-start-2">
            <LineChart2
              metric={
                currentData.metrics[Object.keys(currentData.metrics)[1]].metric
              }
              value={
                currentData.metrics[Object.keys(currentData.metrics)[1]].value
              }
              time={
                currentData.metrics[Object.keys(currentData.metrics)[1]].time
              }
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
