import React from 'react';
import ClusterInput from '../components/ClusterInput';
import NavBar from '../components/Navbar';

import { RootState } from '../slices/store';
import { useSelector, useDispatch } from 'react-redux';
import { saveUrl } from '../slices/metricsSlice';

export default function WelcomePage() {
  const urlShow = useSelector((state: RootState) => state.metrics.input);
  const dispatch = useDispatch();
  // const [createData, { isLoading, error }] = useGrabMetricsMutation();

  // function handleClick(data: string) {
  //   try {
  //     console.log(data);
  //     const response = createData(data);
  //     console.log('data created!', response);
  //   } catch (error) {
  //     console.log('error creating data:', error);
  //   }
  // }

  function handleInputChange(e: any) {
    // Dispatch the updateInput action to update the input value in Redux store
    dispatch(saveUrl(e.target.value));
  }

  return (
    <>
      <NavBar title="Home" to="/" />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#3AD48F] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="h-screen mx-auto max-w-3xl py-28 sm:py-32 lg:py-20">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-zinc-400 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-kalegreen-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-200 sm:text-6xl">
              Welcome to <p className="inline-block text-kalegreen-400">kale</p>
              , your new favorite Kubernetes autoscaling tool
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-400">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>

            <ClusterInput
              handleInputChange={handleInputChange}
              // handleClick={() => handleClick(urlShow)}
            />
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#3AD48F] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
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
