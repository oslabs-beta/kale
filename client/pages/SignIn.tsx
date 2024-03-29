import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSigninMutation } from '../slices/userApi';
import { setCredential } from '../slices/userSlice';
import { VerifyData } from '../../types';
import NavBar from '../components/Navbar';
const SignInContainer = () => {
  const [signin] = useSigninMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifyData, setVerifyData] = useState<VerifyData>({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setVerifyData({
      ...verifyData,
      [name]: value,
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(verifyData)
      .unwrap()
      .then((res) => {
        dispatch(setCredential(res));
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <NavBar title='Sign In' to='/signin' />
      <section className='bg-gray-50 dark:bg-zinc-950'>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16'>
            <div className='flex flex-col justify-center'>
              <h1 className='mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
                Optimizing Efficiency in AI/ML: Minimizing Costs and Resource
                Use{' '}
              </h1>
              <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>
                Here at Kale we leverage your unleashed talent, technology, and
                innovation to help improve flow of communication.
              </p>
            </div>
            <div>
              <div className='w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-zinc-800'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Sign in to kale
                </h2>
                {/* Form starts from here */}
                <form onSubmit={submitHandler} className='mt-8 space-y-6'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Your email
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      value={verifyData.email}
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='name@company.com'
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Your password
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='••••••••'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required
                      value={verifyData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='remember'
                        aria-describedby='remember'
                        name='remember'
                        type='checkbox'
                        className='w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
                      />
                    </div>
                    <div className='ms-3 text-sm'>
                      <label
                        htmlFor='remember'
                        className='font-medium text-gray-500 dark:text-gray-400'
                      >
                        Remember this device
                      </label>
                    </div>
                    {/**Forgot Password */}
                    {/* <Link
                    href="#"
                    className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Forgot Password?
                  </Link> */}
                  </div>
                  <button
                    type='submit'
                    className='w-full text-white bg-kalegreen-600 hover:bg-kalegreen-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800'
                  >
                    Login to your account
                  </button>
                  <div className='text-sm font-medium text-gray-900 dark:text-white'>
                    Not registered yet?{' '}
                    <Link
                      to='/signup'
                      className='text-blue-600 hover:underline dark:text-blue-500'
                    >
                      Create account
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SignInContainer;