import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../slices/store';
import NavBar from '../components/Navbar';
import {
  useGrabMetricsMutation,
  useSendSnapshotsMutation,
} from '../slices/metricsApi';
import SnapshotButton from '../components/SnapshotButton';
import ChartTable from '../components/ChartTable';
import { MetricsState } from '../../types';
import { setMetrics } from '../slices/metricsSlice';

export default function Dashboard() {
  const urlShow = useSelector((state: RootState) => state.ui.urlInput);
  const metrics = useSelector((state: RootState) => state.metrics);

  const dispatch = useDispatch();

  const [grabMetrics, { data: currentData, error, isLoading }] =
    useGrabMetricsMutation();

  const [createSnapshot] = useSendSnapshotsMutation({
    fixedCacheKey: 'last-snapshot-data',
  });

  if (urlShow !== '') {
    useEffect(() => {
      if (currentData) {
        dispatch(setMetrics(currentData));
      }
    }, [currentData]);

    useEffect(() => {
      const interval = setInterval(() => {
        grabMetrics(urlShow);
      }, 30000);
      return () => clearInterval(interval);
    }, []);
  }

  function handleClick(data: MetricsState) {
    try {
      const response = createSnapshot(data);
    } catch (error) {
      console.log('error saving data:', error);
    }
  }

  return (
    <>
      <NavBar title="Dashboard" to="/dashboard" />
      {!metrics.dataAll ? (
        <div className="text-zinc-200">Data loading...</div>
      ) : metrics.dataAll ? (
        <>
          <div className="max-w-screen-xl flex flex-wrap items-start justify-between mx-20 my-8">
            <p className="text-lg text-center dark:text-kalegreen-400">
              Cluster URL:{' '}
              <p className="inline-block text-lg text-center dark:text-zinc-300">
                {urlShow}
              </p>
            </p>
            <div className="flex flex-col h-32 w-60 items-center justify-center">
              <p className="text-lg text-center dark:text-kalegreen-300">
                Name of GPU
              </p>
              <p className="font-serif text-xl text-center h-full p-3 dark:text-zinc-300">
                {metrics.dataAll[0].modelName}
              </p>
            </div>
            <SnapshotButton handleClick={() => handleClick(metrics)} />
          </div>

          <ChartTable metrics={metrics.dataAll[0].metrics} />
        </>
      ) : null}
    </>
  );
}
