import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSignupMutation } from '../slices/userApi';
import { RootState } from '../slices/store';

import { Link, useNavigate } from 'react-router-dom';
import { setCredential } from '../slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { VerifyData } from '../../types';
import NavBar from '../components/Navbar';
const SignupContainer = () => {
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
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  //this enables us to see the user's input with every stroke
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'email') {
      setEmailError('');
    }
    if (name === 'password') {
      const isValid = passwordPattern.test(value) || value.length === 0;

      setPasswordError(
        passwordPattern.test(value) ? '' : 'Password must meet requirements.'
      );
    } else if (name === 'confirmPassword') {
      setConfirmPasswordError(
        loginData.password !== value && value ? 'Passwords do not match.' : ''
      );
    }
  };
  const passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
  const passwordValid =
    loginData.password.length === 0 || passwordPattern.test(loginData.password);

  const validatePassword = (
    password: string,
    confirmPassword: string
  ): boolean => {
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

  //ensures both password inputs are complex enough, sends the data to the backend, and sets our localStorage using dispatch
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
      dispatch(setCredential({ id: res._id, firstName: res.firstName }));
      navigate('/welcome');
      navigate('/welcome');
    } catch (err) {
      if (err.status === 400 && err.data.includes('exist')) {
        setEmailError('Email address already taken');
      } else {
        console.error(err);
      }
    }
  };
  return (
    <>
      <NavBar title="Sign Up" to="/signup" />
      <section className="bg-gray-50 dark:bg-zinc-950">
        <div className="flex items-center justify-center min-h-screen">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 text-center md:text-5xl lg:text-6xl dark:text-white">
                Optimizing Efficiency in AI/ML: Minimizing Costs and Resource
                Use{' '}
              </h1>
              <p className="mb-6 text-center text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Here at Kale we leverage your unleashed talent, technology, and
                innovation to help improve flow of communication.
              </p>
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
                    className={`bg-gray-50  ${
                      emailError
                        ? '!border-2 !border-red-500'
                        : '!border !border-gray-300'
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="name@company.com"
                    required
                    value={loginData.email}
                    onChange={handleChange}
                  />
                  {emailError && (
                    <p className="text-xs text-left font-medium text-red-500">
                      {emailError}
                    </p>
                  )}
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

                <p
                  className={`!mt-0 text-xs font-medium ${
                    loginData.password.length > 0 && !passwordValid
                      ? '!text-red-500'
                      : '!text-white'
                  } dark:text-white`}
                >
                  Create a strong password with at least 8 characters with upper
                  and lower case letters, numbers, and symbols.
                </p>

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
                <div className="flex justify-between items-center !mt-0">
                  <div className="!mt-0 text-left mt-0">
                    {confirmPasswordError && (
                      <p className="!mt-0 text-xs text-left font-medium text-red-500">
                        {confirmPasswordError}
                      </p>
                    )}
                  </div>
                  <div className="!mt-0 text-right mt-0">
                    <button
                      type="button"
                      className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 'Hide password' : 'Show password'}
                    </button>
                  </div>
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
                    to="/signin"
                    className="text-blue-600 hover:underline dark:text-blue-500"
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
