import React from 'react';
import Gauge from '../components/Gauge.jsx';
import NavBar from '../components/Navbar.jsx';
import Chart from '../components/Chart.jsx';

export default function Dashboard() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <h1>Dashboard</h1>
      <Gauge />
      <div>
        <Chart />
      </div>
    </div>
  );
}
