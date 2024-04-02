import React from 'react';
import ClusterInput from '../components/ClusterInput';
import NavBar from '../components/Navbar';
import { useGrabMetricsMutation } from '../slices/metricsApi';
import { RootState } from '../slices/store';
import { useSelector, useDispatch } from 'react-redux';
import { saveUrl, saveNodeName } from '../slices/uiSlice';

type handleClickArg = { url: string; podName: string };

export default function WelcomePage() {
  const urlShow = useSelector((state: RootState) => state.ui.urlInput);
  const podName = useSelector((state: RootState) => state.ui.nodeNameInput);
  const userDataShow = useSelector((state: RootState) => state.users.userData);

  const [grabMetrics, result] = useGrabMetricsMutation({
    fixedCacheKey: 'current-metric-data',
  });

  const dispatch = useDispatch();

  // handle the 'Go' button click event to fetch the metrics data with provided url
  function handleClick({ url, podName }: handleClickArg) {
    try {
      const response = grabMetrics({ url, podName });
    } catch (error) {
      console.log('error creating data:', error);
    }
  }

  // Update url as user types
  function handleUrlChange(e: any) {
    dispatch(saveUrl(e.target.value));
  }
  // Update node name as user types
  function handlePodNameChange(e: any) {
    dispatch(saveNodeName(e.target.value));
  }

  return (
    <>
      <NavBar title="Home" to="/" />
      <div className="relative h-screen isolate pt-14 ">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-96">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#3AD48F] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="h-full mx-auto max-w-3xl py-28 sm:py-32 lg:py-20 text-left">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-200 sm:text-6xl">
            Hello{' '}
            <p className="inline-block text-kalegreen-400">
              {userDataShow ? userDataShow.firstName : 'Random Hacker'}
            </p>
            ,
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Please enter your cluster's Prometheus URL and the name of the pod
            you want to monitor*.
          </p>
          <ClusterInput
            handleUrlChange={handleUrlChange}
            handlePodNameChange={handlePodNameChange}
            handleClick={handleClick}
            url={urlShow}
            podName={podName}
          />
          <p className="mt-6 text-xs leading-8 text-zinc-400">
            *Proof of Concept: Data is currently based on <b>CPU metrics</b>.
            More comprehensive metrics are in development.
          </p>
        </div>
        <div
          className="absolute h-80 inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative h-full left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#3AD48F] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </>
  );
}
