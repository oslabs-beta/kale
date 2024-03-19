import React from 'react';
import ClusterInput from '../components/ClusterInput';
import NavBar from '../components/Navbar';
import { useGrabMetricsMutation } from '../slices/metricsApi';
import { RootState } from '../slices/store';
import { useSelector, useDispatch } from 'react-redux';
import { saveUrl } from '../slices/metricsSlice';

export default function WelcomePage() {
  const urlShow = useSelector((state: RootState) => state.metrics.input);
  const dispatch = useDispatch();
  const [createData, { isLoading, error }] = useGrabMetricsMutation();

  function handleClick(data: string) {
    try {
      console.log(data);
      const response = createData(data);
      console.log('data created!', response);
    } catch (error) {
      console.log('error creating data:', error);
    }
  }

  function handleInputChange(e: any) {
    // Dispatch the updateInput action to update the input value in Redux store
    dispatch(saveUrl(e.target.value));
  }

  return (
    <>
      <NavBar title="Home" />
      <div></div>
      <div>
        <h2 className="text-red-900">Welcome, Jeff</h2>
      </div>
      <div>
        <ClusterInput
          handleInputChange={handleInputChange}
          handleClick={() => handleClick(urlShow)}
        />
      </div>
    </>
  );
}
