import React from 'react';
import { useGetSnapshotsQuery } from '../slices/metricsApi';
import Navbar from '../components/Navbar';

export default function History() {
  // const { data, error, isLoading } = useGetSnapshotsQuery();

  return (
    <div>
      <Navbar title="History" />
      <h1 className="text-xl">Kale</h1>
      <div>
        <h2 className="text-red-900">History</h2>
      </div>
    </div>
  );
}
