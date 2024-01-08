import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import phonebookImage from '../photos/phonebook.png';
import Register from './register';
import { isAuth } from './helper';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
  }

  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  const isAuthenticated = isAuth();

  const handleContacts = () => {
    if (isAuthenticated) {
      navigate('/userpost'); 
    } else {
      openRegisterModal(); 
    }
  };

  return (
    <div>
      <ToastContainer />
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <a href="#contacts" className="flex items-center">
            <img
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
              className="h-8 mr-3 text-slate-500"
              alt=""
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-500">
              Media App
            </span>
          </a>
          <div className="flex items-center">
           
            {isAuthenticated && (
              <button
                className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleContacts}
              >
                Post
              </button>
            )}
            {!isAuthenticated && (
              <button
                className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={openRegisterModal}
              >
                Join Now
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="w-[90vw] mx-auto text-center">
        <section className="bg-gray-100 text-white py-2 mt-4 w-full sm:h-[85vh] min:h-screen relative">
          <div className="container mx-auto flex flex-wrap items-center">
            <div className="w-full md:w-1/2 mt-16">
              <h1 className="text-5xl font-bold mb-4 text-gray-500">
                Welcome to Media App
              </h1>
              <p className="text-xl mb-4 text-gray-400">
                All your Posts in one place
              </p>
              {isAuthenticated && (
                <button
                  className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={handleContacts}
                >
                  Posts
                </button>
              )}
              {!isAuthenticated && (
                <button
                  className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={openRegisterModal}
                >
                  Click Join Now to Get started
                </button>
              )}
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <img
                style={{
                  marginTop: '100px',
                  width: '400px',
                  height: '400px',
                }}
                alt="Unicorn"
                src={phonebookImage}
              />
            </div>
          </div>
        </section>
      </div>
      {isRegisterOpen && !isAuthenticated && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-8 w-1/2">
            <Register closeModal={closeRegisterModal} />
          </div>
        </div>
      )}
    </div>
  );
}
