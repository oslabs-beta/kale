import { RootState, useAppDispatch } from '../slices/store';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showInput, saveUrl } from '../slices/uiSlice';

type ClusterInputProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (url: string) => void;
  url: string;
};

const ClusterInput = (props: ClusterInputProps) => {
  const isInputOpen = useSelector((state: RootState) => state.ui.isInputOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      {!isInputOpen ? (
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            className="rounded-md bg-kalegreen-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-kalegreen-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kalegreen-600"
            onClick={() => dispatch(showInput())}
          >
            Get started
          </button>
          <a href="#" className="text-sm font-semibold leading-6 text-zinc-600">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      ) : (
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"></label>
          <input
            type="text"
            id="url-input"
            placeholder="Your Prometheus URL"
            onChange={props.handleInputChange}
            className="url-input bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <Link
            to="/dashboard"
            className="rounded-md bg-kalegreen-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-kalegreen-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kalegreen-600"
          >
            <button onClick={() => props.handleClick(props.url)}>Go</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ClusterInput;
