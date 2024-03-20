import React from 'react';
import { Link } from 'react-router-dom';
import {
  useDeleteSnapshotsMutation,
  useGetSnapshotsQuery,
} from '../slices/metricsApi';
import Navbar from '../components/Navbar';
import { MetricsData } from '../../types.d';

export default function History() {
  const { data: snapShots, error, isLoading } = useGetSnapshotsQuery();
  const [
    deleteSnapshots, // This is the mutation trigger
    { data: deleteSnapshot, isLoading: isDeleting }, // This is the destructured mutation result
  ] = useDeleteSnapshotsMutation();

  const handleDelete = (id: string) => {
    deleteSnapshots(id);
    if (!isDeleting) console.log('Deleted:', deleteSnapshot);
  };

  const dataArr = [];
  if (snapShots) {
    console.log(snapShots);
    for (let i = 0; i < snapShots.length; i++) {
      dataArr.push(
        <tr className="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-600">
          <td className="w-4 p-4">
            <div className="flex items-center">
              <input
                id={`checkbox-table-search-${i + 1}`}
                type="checkbox"
                className="w-4 h-4 text-kalegreen-600 bg-zinc-100 border-zinc-300 rounded focus:ring-kalegreen-500 dark:focus:ring-kalegreen-600 dark:ring-offset-zinc-800 dark:focus:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
              />
              <label htmlFor="checkbox-table-search-1" className="sr-only">
                checkbox
              </label>
            </div>
          </td>
          <th
            scope="row"
            className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white"
          >
            <Link to={`/history/${snapShots[i]._id}`}>{snapShots[i]._id}</Link>
          </th>

          <td className="px-6 py-4">pod</td>
          <td className="px-6 py-4">{snapShots[i].podName}</td>
          <td className="px-6 py-4">{snapShots[i].date}</td>
          <td className="px-6 py-4">
            <button
              className="font-medium text-kalegreen-600 dark:text-kalegreen-500 hover:underline"
              onClick={() => handleDelete(snapShots[i]._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
  }

  return (
    <div>
      <Navbar title="History" to="/history" />
      <div className="mx-32 my-10 sm:mx-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <div>
              <button
                id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                className="inline-flex items-center text-zinc-500 bg-white border border-zinc-300 focus:outline-none hover:bg-zinc-100 focus:ring-4 focus:ring-zinc-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-zinc-800 dark:text-white dark:border-zinc-600 dark:hover:bg-zinc-700 dark:hover:border-zinc-600 dark:focus:ring-zinc-700"
                type="button"
              >
                <svg
                  className="w-3 h-3 text-zinc-500 dark:text-zinc-400 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                </svg>
                Last 30 days
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* <!-- Dropdown menu --> */}
              <div
                id="dropdownRadio"
                className="z-10 hidden w-48 bg-white divide-y divide-zinc-100 rounded-lg shadow dark:bg-zinc-700 dark:divide-zinc-600"
                data-popper-reference-hidden=""
                data-popper-escaped=""
                data-popper-placement="top"
                style={{
                  position: 'absolute',
                  inset: 'auto auto 0px 0px',
                  margin: ' 0px',
                  transform: 'translate3d(522.5px, 3847.5px, 0px)',
                }}
              >
                <ul
                  className="p-3 space-y-1 text-sm text-zinc-700 dark:text-zinc-200"
                  aria-labelledby="dropdownRadioButton"
                >
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-600">
                      <input
                        id="filter-radio-example-1"
                        type="radio"
                        value=""
                        name="filter-radio"
                        className="w-4 h-4 text-kalegreen-600 bg-zinc-100 border-zinc-300 focus:ring-kalegreen-500 dark:focus:ring-kalegreen-600 dark:ring-offset-zinc-800 dark:focus:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
                      />
                      <label
                        htmlFor="filter-radio-example-1"
                        className="w-full ms-2 text-sm font-medium text-zinc-900 rounded dark:text-zinc-300"
                      >
                        Last day
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-600">
                      <input
                        id="filter-radio-example-2"
                        type="radio"
                        value=""
                        name="filter-radio"
                        className="w-4 h-4 text-kalegreen-600 bg-zinc-100 border-zinc-300 focus:ring-kalegreen-500 dark:focus:ring-kalegreen-600 dark:ring-offset-zinc-800 dark:focus:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
                      />
                      <label
                        htmlFor="filter-radio-example-2"
                        className="w-full ms-2 text-sm font-medium text-zinc-900 rounded dark:text-zinc-300"
                      >
                        Last 7 days
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-600">
                      <input
                        id="filter-radio-example-3"
                        type="radio"
                        value=""
                        name="filter-radio"
                        className="w-4 h-4 text-kalegreen-600 bg-zinc-100 border-zinc-300 focus:ring-kalegreen-500 dark:focus:ring-kalegreen-600 dark:ring-offset-zinc-800 dark:focus:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
                      />
                      <label
                        htmlFor="filter-radio-example-3"
                        className="w-full ms-2 text-sm font-medium text-zinc-900 rounded dark:text-zinc-300"
                      >
                        Last 30 days
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-600">
                      <input
                        id="filter-radio-example-4"
                        type="radio"
                        value=""
                        name="filter-radio"
                        className="w-4 h-4 text-kalegreen-600 bg-zinc-100 border-zinc-300 focus:ring-kalegreen-500 dark:focus:ring-kalegreen-600 dark:ring-offset-zinc-800 dark:focus:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
                      />
                      <label
                        htmlFor="filter-radio-example-4"
                        className="w-full ms-2 text-sm font-medium text-zinc-900 rounded dark:text-zinc-300"
                      >
                        Last month
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-600">
                      <input
                        id="filter-radio-example-5"
                        type="radio"
                        value=""
                        name="filter-radio"
                        className="w-4 h-4 text-kalegreen-600 bg-zinc-100 border-zinc-300 focus:ring-kalegreen-500 dark:focus:ring-kalegreen-600 dark:ring-offset-zinc-800 dark:focus:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
                      />
                      <label
                        htmlFor="filter-radio-example-5"
                        className="w-full ms-2 text-sm font-medium text-zinc-900 rounded dark:text-zinc-300"
                      >
                        Last year
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-zinc-500 dark:text-zinc-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 ps-10 text-sm text-zinc-900 border border-zinc-300 rounded-lg w-80 bg-zinc-50 focus:ring-kalegreen-500 focus:border-kalegreen-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-kalegreen-500 dark:focus:border-kalegreen-500"
                placeholder="Search for items"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
            <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-kalegreen-600 bg-zinc-100 border-zinc-300 rounded focus:ring-kalegreen-500 dark:focus:ring-kalegreen-600 dark:ring-offset-zinc-800 dark:focus:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>{dataArr}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
