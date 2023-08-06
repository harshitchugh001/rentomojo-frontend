import React from 'react';
import { signout } from './helper';


export default function logout() {

    const handleLogout = () => {
        signout(() => {
          window.location.href = '/';
        });
      };
  return (
    <div><nav className="bg-white border-gray-200">
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
        <button
          className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  </nav></div>
  )
}
