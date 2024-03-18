import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import Gauge from '../components/Gauge.jsx';
import NavBar from '../components/Navbar';
//import Chart from '../components/Chart.jsx';

export default function Dashboard() {
  const {
    name,
    driverVersion,
    gpuUtilizationPercentage,
    powerDrawPercentage,
    temperatureCelsius,
    fanSpeedPercentage,
    memoryUtilizationPercentage,
    memoryAllocation,
  }: MetricsState = useSelector((state) => state.metrics);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <h1>Dashboard</h1>
      {/* <Gauge /> */}
      <div>{/* <Chart /> */}</div>
    </div>
  );
}
