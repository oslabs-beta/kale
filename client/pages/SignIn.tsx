import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../slices/store';
import { useLoginMutation } from '../slices/userApi';
import { setCredential } from '../slices/userSlice';
import { VerifyData } from '../../types';
import NavBar from '../components/Navbar';
import { useSelector } from 'react-redux';

const SignInContainer = () => {
  const [signin] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [verifyData, setVerifyData] = useState<VerifyData>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setVerifyData({
      ...verifyData,
      [name]: value,
    });
    if (authError) setAuthError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(verifyData)
      .unwrap()
      .then((res) => {
        const userData = {
          firstName: res.firstName,
          email: res.email,
        };
        dispatch(setCredential(userData));
        navigate('/welcome');
        console.log(res);
        const data = {
          id: res._id,
          firstName: res.firstName,
        };
        dispatch(setCredential(data));
        navigate('/welcome');
      })
      .catch((err) => {
        setAuthError(`Invalid log in credentials`);
      });
  };

  return (
    <>
      <NavBar title='Sign In' to='/signin' />
      <section className='bg-gray-50 dark:bg-zinc-950'>
        <div className='flex items-center justify-center min-h-screen'>
          <div
            className='py-8 px-4 mx-auto 
          max-w-screen-xl lg:py-16 grid lg:grid-cols-1 gap-8 lg:gap-16'
          >
            <div className='w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-zinc-800'>
              <h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center'>
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
                    className={`bg-gray-50  ${
                      authError
                        ? '!border-2 !border-red-500'
                        : '!border !border-gray-300'
                    }   text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    id='password'
                    placeholder='Password'
                    className={`bg-gray-50  ${
                      authError
                        ? '!border-2 !border-red-500'
                        : '!border !border-gray-300'
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    required
                    value={verifyData.password}
                    onChange={handleChange}
                  />
                  <p
                    className='!mt-0 text-xs font-medium !text-white
                    } dark:text-white'
                  >
                    Use your registered password to sign in. Ensure it's entered
                    correctly, including upper and lower case letters, numbers,
                    and symbols
                  </p>

                  <div className='flex justify-between items-center !mt-0'>
                    <div className='!mt-0 text-left mt-0'>
                      {authError && (
                        <p className='!mt-0 text-xs text-left font-medium text-red-500'>
                          {authError}
                        </p>
                      )}
                    </div>
                    <div className='!mt-0 text-right mt-2'>
                      <button
                        type='button'
                        className=' mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? 'Hide password' : 'Show password'}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type='submit'
                  className='w-full text-white bg-kalegreen-600 hover:bg-kalegreen-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800'
                >
                  Login to your account
                </button>
                <div className='text-sm font-light text-gray-500 dark:text-gray-400'>
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
      </section>
    </>
  );
};

export default SignInContainer;
