import { RootState } from '../slices/store';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveUrl } from '../slices/metricsSlice';

type ClusterInputProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ClusterInput = (props: ClusterInputProps) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      </label>
      <input
        type="text"
        id="default-input"
        placeholder='Your Prometheus URL'
        onChange={props.handleInputChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default ClusterInput;
