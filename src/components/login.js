import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authenticate, isAuth } from './helper';
import { useNavigate } from 'react-router-dom';

const Login = ({ closeModal }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userEmail: '',
    userPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email: user.userEmail, password: user.userPassword },
    })
      .then((response) => {
        console.log(response.data);
        console.log('SIGNIN SUCCESS', response);
        authenticate(response, () => {
          setUser({
            userEmail: '',
            userPassword: '',
          });
          toast.success(`Hey ${response.data.user.name}, Welcome back!`);
          isAuth()
            ? navigate('/userpost')
            : navigate('/');
        });
      })
      .catch((error) => {
        console.log('SIGNIN ERROR', error.response.data);
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Login Form</h2>
      <div className="mt-2">
        <form>
          <div className="my-3">
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="userEmail"
                id="userEmail"
                value={user.userEmail}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
              />
            </div>
          </div>
          <div className="my-3">
            <label
              htmlFor="userPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                name="userPassword"
                id="userPassword"
                value={user.userPassword}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2"
          onClick={closeModal}
        >
          Close
        </button>
        <div className="clear-both">
          <span className="text-sm text-gray-500">
            Don't have an account?{' '}
            <a
              href="#login"
              className="text-blue-500 hover:text-blue-600"
              onClick={closeModal}
            >
              Register here
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
