import { RootState } from '../slices/store';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveUrl } from '../slices/metricsSlice';

type ClusterInputProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ClusterInput = (props: ClusterInputProps) => {
  return (
    <div>
      <div></div>
      <input type="text" onChange={props.handleInputChange} />
      <button>Add</button>
    </div>
  );
};

export default ClusterInput;
