import react from 'react';
import Gauge from '../components/Gauge.jsx';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Gauge data={data} />
    </div>
  );
}
