import React from 'react';
import GaugeChart from '../components/GaugeChart';
import NavBar from '../components/Navbar';
import LineChart from '../components/LineChart';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../slices/store';
import {
  useGetSnapshotState,
  useDeleteSnapshotsMutation,
} from '../slices/metricsApi';
import { Snapshot } from '../slices/metricsApi';

export default function SnapshotPage() {
  const { snapshotId } = useParams();
  const urlShow = useSelector((state: RootState) => state.metrics.input);
  const { data: snapshots, error, isLoading } = useGetSnapshotState();

  const [
    deleteSnapshots, // This is the mutation trigger
    { data: deleteSnapshot, isLoading: isDeleting }, // This is the destructured mutation result
  ] = useDeleteSnapshotsMutation();

  const handleDelete = (id: string) => {
    deleteSnapshots(id);
    if (!isDeleting) console.log('Deleted:', deleteSnapshot);
  };

  let currSnapshot: Snapshot;
  const lineChartArr: JSX.Element[] = [];
  const gaugeChartArr: JSX.Element[] = [];

  if (snapshots) {
    for (let i = 0; i < snapshots.length; i++) {
      if (snapshots[i]._id === snapshotId) {
        currSnapshot = snapshots[i];
      }
    }

    for (let i = 0; i < Object.keys(currSnapshot.metrics).length; i++) {
      lineChartArr.push(
        <LineChart
          metric={Object.keys(currSnapshot.metrics)[i]}
          value={
            currSnapshot.metrics[Object.keys(currSnapshot.metrics)[i]].value
          }
          time={currSnapshot.metrics[Object.keys(currSnapshot.metrics)[i]].time}
          key={i}
        />
      );
    }
    for (let i = 0; i < Object.keys(currSnapshot.metrics).length; i++) {
      gaugeChartArr.push(
        <GaugeChart
          metric={Object.keys(currSnapshot.metrics)[i]}
          value={
            currSnapshot.metrics[Object.keys(currSnapshot.metrics)[i]].value[
              currSnapshot.metrics[Object.keys(currSnapshot.metrics)[i]].value
                .length - 1
            ]
          }
          time={
            currSnapshot.metrics[Object.keys(currSnapshot.metrics)[i]].time[
              currSnapshot.metrics[Object.keys(currSnapshot.metrics)[i]].time
                .length - 1
            ]
          }
          key={i}
        />
      );
    }
  }

  return (
    <>
      <NavBar title={`History: ${snapshotId}`} to={`/history/${snapshotId}`} />

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-20 my-8">
        <p className="text-lg text-center dark:text-zinc-300">
          Cluster URL: {urlShow}
        </p>
        <button
          className="inline-block rounded-md bg-rose-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-800"
          onClick={() => handleDelete(snapshotId)}
        >
          Delete Snapshot
        </button>
      </div>
      <div className="w-full grid grid-cols-6 grid-rows-2 gap-3 place-content-center mx-20">
        <div className="h-80 max-w-full content-center">
          <p className="text-lg text-center dark:text-zinc-300">Name of GPU</p>
          <p className="font-serif text-xl text-center h-full p-3 dark:text-zinc-300">
            NVIDIA GeForce RTX 3080
          </p>
        </div>
        <div className="h-64 max-w-full content-center">
          <p className="text-lg text-center dark:text-zinc-300">
            Driver Version
          </p>
          <p className="font-serif text-xl text-center h-full p-3 dark:text-zinc-300">
            465.19
          </p>
        </div>
        <div className="h-64 max-w-full col-span-2">{gaugeChartArr[0]}</div>
        <div className="h-64 max-w-full col-span-2 col-start-5">
          {gaugeChartArr[1]}
        </div>
        <div className="h-96 max-w-full col-span-3 row-start-2">
          {lineChartArr[0]}
        </div>
        <div className="h-96 max-w-full col-span-3 col-start-4 row-start-2">
          {lineChartArr[1]}
        </div>
      </div>
    </>
  );
}
