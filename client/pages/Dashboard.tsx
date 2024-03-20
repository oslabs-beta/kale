import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../slices/store';
import GaugeChart from '../components/GaugeChart';
import NavBar from '../components/Navbar';
import LineChart from '../components/LineChart';
import {
  // useGetMetricsQuery,
  useGrabMetricsMutation,
  useSendSnapshotsMutation,
} from '../slices/metricsApi';
import LineChart2 from '../components/LineChart2';
import SnapshotButton from '../components/SnapshotButton';
import GuageChart2 from '../components/GuageChart2';
import ChartTable from '../components/ChartTable';
import { ApiData } from '../../types';

export default function Dashboard() {
  const urlShow = useSelector((state: RootState) => state.metrics.input);
  // const { data: currentData, error, isLoading } = useGetMetricsQuery(urlShow);
  const [grabMetrics, { data: currentData, error, isLoading }] =
    useGrabMetricsMutation({
      fixedCacheKey: 'current-metric-data',
    });
  const [createSnapshot] = useSendSnapshotsMutation({
    fixedCacheKey: 'last-snapshot-data',
  });

  function handleClick(data: ApiData) {
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
      <NavBar title="Dashboard" to="/dashboard" />
      {isLoading || !currentData ? (
        <div className="text-zinc-200">Data loading...</div>
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
          <ChartTable metrics={currentData.metrics} />
        </div>
      ) : null}
    </>
  );
}
