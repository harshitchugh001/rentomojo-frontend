import React, { useState } from 'react';
import Login from './login';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Register = ({ closeModal }) => {
  const [user, setUser] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
    buttonText: 'Submit'
  });
  const { userName, userEmail, userPassword, buttonText } = user;
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, buttonText: 'Submitting' });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signup`,
      data: { userName, userEmail, userPassword }
    })
      .then(response => {
        console.log('SIGNUP SUCCESS', response);
        setUser({ ...user, userNamename: '', userEmailemail: '', userEmailpassword: '', buttonText: 'Submitted' });
        toast.success(response.data.message);
      })
      .catch(error => {
        console.log('SIGNUP ERROR', error.response.data);
        setUser({ ...user, buttonText: 'Submit' });
        toast.error(error.response.data.error);
      });
    closeModal();
  };

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <div className="modal">
      {!isLoginOpen ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Register Form</h2>
          
          <form>
            <div className="my-3">
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={user.userName}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 bg-slate-100"
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="userEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                name="userEmail"
                id="userEmail"
                value={user.userEmail}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 bg-slate-100"
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="userPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="userPassword"
                id="userPassword"
                value={user.userPassword}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 bg-slate-100"
              />
            </div>

            <button
              type="button"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleSubmit}

            >
              {buttonText}
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
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-600"
                  onClick={openLoginModal}
                >
                  Login here
                </button>
              </span>
            </div>
          </form>
        </>
      ) : (
        <Login closeModal={closeLoginModal} />
      )}
    </div>
  );
};

export default Register;
