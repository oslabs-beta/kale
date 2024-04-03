import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../slices/store';
import NavBar from '../components/Navbar';
import { Snapshot, useSendSnapshotsMutation } from '../slices/snapshotsApi';
import { useGrabMetricsMutation } from '../slices/metricsApi';
import SnapshotButton from '../components/SnapshotButton';
import ChartTable from '../components/ChartTable';

export default function Dashboard() {
  const url = useSelector((state: RootState) => state.ui.urlInput);
  const podName = useSelector((state: RootState) => state.ui.nodeNameInput);
  const grabUserInfo = useSelector((state: RootState) => state.user.userData);
  const [grabMetrics, { data: currentData, error, isLoading }] =
    useGrabMetricsMutation({
      fixedCacheKey: 'current-metric-data',
    });

  const [createSnapshot] = useSendSnapshotsMutation({
    fixedCacheKey: 'last-snapshot-data',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      grabMetrics({ url, podName });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  function handleClick(data: Snapshot) {
    try {
      const response = createSnapshot(data);
      console.log('data created!', response);
    } catch (error) {
      console.log('error saving data:', error);
    }
  }

  return (
    <>
      <NavBar title="Dashboard" to="/dashboard" />
      {isLoading ? (
        <div className="text-zinc-200">Data loading...</div>
      ) : currentData ? (
        <>
          <div className="max-w-screen-xl flex flex-wrap items-start justify-between mx-20 my-8">
            <p className="text-lg text-center dark:text-kalegreen-400">
              Cluster URL:{' '}
              <p className="inline-block text-lg text-center dark:text-zinc-300">
                {url}
              </p>
            </p>
            <div className="flex flex-col h-32 w-60 items-center justify-center">
              <p className="text-lg text-center dark:text-kalegreen-300">
                Name of GPU
              </p>
              <p className="font-serif text-xl text-center h-full p-3 dark:text-zinc-300">
                NVIDIA GeForce RTX 3080
              </p>
            </div>
            <div className="flex flex-col h-32 w-60 items-center justify-center">
              <p className="text-lg text-center dark:text-kalegreen-300">
                Driver Version
              </p>
              <p className="font-serif text-xl text-center h-full p-3 dark:text-zinc-300">
                465.19
              </p>
            </div>
            <SnapshotButton
              handleClick={handleClick}
              currentData={{ ...currentData, user: grabUserInfo.id }}
            />
          </div>

          <ChartTable metrics={currentData.metrics} />
        </>
      ) : null}
    </>
  );
}
