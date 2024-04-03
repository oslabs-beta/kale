import React from 'react';
import { Link } from 'react-router-dom';

type handleClickArg = { url: string; podName: string };

type ClusterInputProps = {
  handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePodNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (arg: handleClickArg) => void;
  url: string;
  podName: string;
};

//passing in all props from the Welcome page
const ClusterInput = ({
  handlePodNameChange,
  handleClick,
  handleUrlChange,
  url,
  podName,
}: ClusterInputProps) => {
  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <input
        type="text"
        id="url-input"
        placeholder="Your Prometheus URL"
        onChange={handleUrlChange}
        className="url-input bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <input
        type="text"
        id="url-input"
        placeholder="Pod Name"
        onChange={handlePodNameChange}
        className="url-input bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <Link
        to="/dashboard"
        id="go-button"
        className="rounded-md bg-kalegreen-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-kalegreen-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kalegreen-600"
      >
        <button onClick={() => handleClick({ url, podName })}> Go </button>
      </Link>
    </div>
  );
};

export default ClusterInput;
