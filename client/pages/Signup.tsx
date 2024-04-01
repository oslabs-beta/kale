import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSignupMutation } from '../slices/userApi';
import { RootState } from '../slices/store';

import { Link, useNavigate } from 'react-router-dom';
import { setCredential } from '../slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { VerifyData } from '../../types';
import NavBar from '../components/Navbar';
const SignupContainer = () => {
  //Initialize necessary hooks for the component

  const [signup] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState<VerifyData>({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    console.log(`name & value: ${name} ${value}`);
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'password' || name === 'confirmPassword') {
      validatePassword(
        loginData.password,
        name === 'confirmPassword' ? value : loginData.confirmPassword
      );
    }
  };

  const validatePassword = (
    password: string,
    confirmPassword: string
  ): boolean => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
    setPasswordError('');
    setConfirmPasswordError('');

    if (!passwordPattern.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long, including uppercase and lowercase letters, a number, and a special character.'
      );
      return false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validatePassword(loginData.password, loginData.confirmPassword)) {
      console.error(
        'The passwords do not match or do not meet the complexity requirements.'
      );
      return;
    }

    try {
      const res = await signup(loginData).unwrap();
      dispatch(setCredential(res));
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <NavBar title="Sign Up" to="/signup" />
      <section className="bg-gray-50 dark:bg-zinc-950">
        <div className="flex items-center justify-center min-h-screen">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-200 sm:text-6xl text-center">
                <p className="text-kalegreen-400">kale</p>
              </h1>
              <ul className="list-inside list-disc space-y-4">
                <li className="flex items-center">
                  <span className="text-blue-600 dark:text-blue-500 mr-2"></span>
                  Get started quickly
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    Flexible solutions to practice at any time and place
                  </p>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 dark:text-blue-500 mr-2"></span>
                  Support any business model
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    Clear, confident, and effective communication unlocks growth
                    and innovation opportunities.
                  </p>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 dark:text-blue-500 mr-2"></span>
                  Join millions of businesses
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    SpeakEasy is trusted by organizations of every size with
                    ambitious goals.
                  </p>
                </li>
              </ul>
            </div>

            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-zinc-800">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Create an account
              </h1>

              {/* Form starts from here */}
              <form
                id="signup-form"
                onSubmit={submitHandler}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your First Name
                  </label>
                  <input
                    type="firstName"
                    name="firstName"
                    id="first-name-signup"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="First Name"
                    required
                    value={loginData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email-signup"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    value={loginData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password-signup"
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={loginData.password}
                    required
                    onChange={handleChange}
                  />
                </div>
                {/* <div className='text-right mt-0'> */}
                <p>
                  Create a strong password including upper and lower case
                  letters, numbers, symbols and 8 characters long.
                </p>
                {/* </div> */}

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    id="confirm-password-signup"
                    placeholder="Confirm"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="text-right mt-0">
                  <button
                    type="button"
                    className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 'Hide password' : 'Show password'}
                  </button>
                </div>
                <button
                  type="submit"
                  id="create-account-btn"
                  className="w-full text-white bg-kalegreen-600 hover:bg-kalegreen-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupContainer;
