import React from 'react';
import ClusterInput from '../components/ClusterInput'
import NavBar from '../components/Navbar';
import { useGetMetricsQuery } from '../slices/metricsApi';
import { RootState } from '../slices/store';
import { useSelector, useDispatch } from 'react-redux';
import { saveUrl } from '../slices/metricsSlice';

export default function WelcomePage() {
  const urlShow = useSelector((state: RootState) => state.metrics.input);
  const dispatch = useDispatch();

  // function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
  //   dispatch(saveUrl(e.target.value));
  // }

  function handleInputChange(e: any) {
    // Dispatch the updateInput action to update the input value in Redux store
    dispatch(saveUrl(e.target.value));
  }

  return (
    <>
      <NavBar title="Home" />
      <div>
      </div>
      <div>
        <h2>{urlShow}</h2>
        <h2 className="text-red-900">Welcome, Jeff</h2>
      </div>
      <div>
        <ClusterInput handleInputChange={handleInputChange} />
      </div>
    </>
  );
}
