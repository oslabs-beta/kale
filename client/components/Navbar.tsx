import { RootState, useAppDispatch } from '../slices/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleSidebar } from '../slices/uiSlice';

type NavBarProps = {
  title: string;
  to: string;
};
export default function NavBar({ title, to }: NavBarProps) {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.isSidebarOpen
  );

  const dispatch = useAppDispatch();

  return (
    <nav className="z-auto border-zinc-200 bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-start p-0 m-0">
        <button
          type="button"
          className="my-2 z-10 text-kalegreen-700 hover:bg-kalegreen-100 dark:hover:bg-zinc-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-kalegreen-400 focus:outline-none dark:focus:bg-zinc-700"
          aria-controls="drawer-navigation"
          onClick={() => dispatch(toggleSidebar())}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {/* <h1 className=" contents w-full self-center text-lg whitespace-nowrap dark:text-white">
          {title}
        </h1> */}
        <Link
          to={to}
          className="flex items-center space-x-3 m-5 rtl:space-x-reverse"
        >
          <span className="z-10 self-center text-lg whitespace-nowrap dark:text-zinc-300">
            {title !== 'Home' ? title : ''}
          </span>
        </Link>

        <div
          id="drawer-navigation"
          className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform duration-700 ${
            isSidebarOpen ? '' : '-translate-x-full'
          } bg-white dark:bg-zinc-900`}
          tabIndex={-1}
          aria-labelledby="drawer-navigation-label"
        >
          <button
            type="button"
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className="text-zinc-400 bg-transparent hover:bg-zinc-200 hover:text-zinc-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-zinc-600 dark:hover:text-white"
            onClick={() => dispatch(toggleSidebar())}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="py-5 overflow-y-auto">
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="flex items-center p-2 text-zinc-900 rounded-lg dark:text-zinc-300 hover:bg-kalegreen-100 dark:hover:bg-zinc-700 group"
                  onClick={() => dispatch(toggleSidebar())}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-zinc-500 transition duration-75 dark:text-zinc-400 group-hover:text-kalegreen-600 dark:group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>

                  <span className="ms-3">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 text-zinc-900 rounded-lg dark:text-zinc-300 hover:bg-kalegreen-100 dark:hover:bg-zinc-700 group"
                  onClick={() => dispatch(toggleSidebar())}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-zinc-500 transition duration-75 dark:text-zinc-400 group-hover:text-kalegreen-600 dark:group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                    />
                  </svg>

                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="flex items-center p-2 text-zinc-900 rounded-lg dark:text-zinc-300 hover:bg-kalegreen-100 dark:hover:bg-zinc-700 group"
                  onClick={() => dispatch(toggleSidebar())}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex-shrink-0 w-5 h-5 text-zinc-500 transition duration-75 dark:text-zinc-400 group-hover:text-kalegreen-600 dark:group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">History</span>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-zinc-900 rounded-lg dark:text-zinc-300 hover:bg-kalegreen-100 dark:hover:bg-zinc-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex-shrink-0 w-5 h-5 text-zinc-500 transition duration-75 dark:text-zinc-400 group-hover:text-kalegreen-600 dark:group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                    />
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-zinc-900 rounded-lg dark:text-zinc-300 hover:bg-kalegreen-100 dark:hover:bg-zinc-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex-shrink-0 w-5 h-5 text-zinc-500 transition duration-75 dark:text-zinc-400 group-hover:text-kalegreen-600 dark:group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
