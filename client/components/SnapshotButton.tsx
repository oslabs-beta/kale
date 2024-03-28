import React from 'react';

type SnapshotButtonProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function SnapshotButton(props: SnapshotButtonProps) {
  return (
    <button
      id="snapshot"
      onClick={props.handleClick}
      className="text-sm text-white dark:text-kalegreen-400"
    >
      Save Snapshot
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#ffffff"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </button>
  );
}
