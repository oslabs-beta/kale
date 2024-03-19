import React from 'react';
import { useGetSnapshotsQuery } from '../slices/metricsApi';

export default function History() {
  const { data, error, isLoading } = useGetSnapshotsQuery();

  return (
    <div>
      <h1 className="text-xl">Kale</h1>
      <div>
        <h2 className="text-red-900">History</h2>
      </div>
    </div>
  );
}
