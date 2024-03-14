import React from 'react';
import Gauge from '../components/Gauge.jsx';
import Chart from '../components/Chart.jsx';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Gauge data={data} />
      <Chart />
    </div>
  );
}
