import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiHospitalFill } from 'react-icons/ri';
import axios from 'axios';
import { backendUrl } from '../constants/urls';

const ResetPassword = () => {
  const [cnic, setCnic] = useState();
  const [code, setCode] = useState();
  const [newPwd, setNewPwd] = useState();

  const [message, setMessage] = useState();
  const [role, setRole] = useState();


  const ResetPwd = async (e) => {
    e.preventDefault();
    setMessage();
    console.log('code', code)
    try {
      const res = await axios.post(`${backendUrl}auth/resetPassword`, {cnic, role, code: code, new_password: newPwd});
      console.log(res.data);
      setMessage(res.data.message);
    } catch (error) {
      console.log(error.response);
    }
  }

  const getResetCode = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('cnic', cnic);
    data.append('role', role);
    console.log('sending reset for ', data);
    setMessage();
    try {
      const res = await axios.post(`${backendUrl}auth/getResetCode`, {cnic, role});
      console.log(res.data);
      setMessage(res.data.message);
    } catch (error) {
      console.log(error.response);
    }
  }
  
  return (
  <div className="">
    <div className="items-center gap-3 p-7 ml-3 mt-4 flex text-4xl font-extrabold tracking-tight dark:text-white text-slate-900">
      <RiHospitalFill className="text-5xl" />
      <span>MedCom</span>
    </div>
    <div className="flex justify-center px-6 my-12">
      <div className="w-full xl:w-3/4 lg:w-11/12 flex place-content-center">
        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg">
          <div className="px-8 mb-4 text-center">
            <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
            <p className="mb-4 text-sm text-gray-700">
              We get it, stuff happens. Just enter your cnic below
              and we'll send you a code to reset your password!
            </p>
          </div>
          <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div className="block p-3 pb-8 font-semibold mx-auto my-auto">
                <div>
                  <input
                    type="radio"
                    value="doctor"
                    checked={role === "doctor"}
                    onChange={(e) => setRole(e.target.value)}
                  />{" "}
                  Doctor
                </div>
                <div>
                  <input
                    type="radio"
                    value="Administration"
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.value)}
                  />{" "}
                  Admin
                </div>
                <div>
                  <input
                    type="radio"
                    value="assistant"
                    checked={role === "pa"}
                    onChange={(e) => setRole(e.target.value)}
                  />{" "}
                  Assistant
                </div>
              </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="Cnic"
              >
                Cnic
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="cnic"
                type="number"
                placeholder="Enter cnic..."
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
              />
            </div>
            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={(e) => getResetCode(e)}
              >
                Get Reset Code
              </button>
              
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="Code"
              >
                Code
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="code"
                type="text"
                placeholder="Enter code..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="New Password"
              >
                New Password
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter New Password..."
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
              />
            </div>
            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={(e) => ResetPwd(e)}
              >
                Reset Password
              </button>
              
            </div>
            <div>{message}</div>
            <hr className="mb-6 border-t" />

            <div className="text-center">
              <NavLink to="/login">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="./index.html"
                >
                  Already have an account? Login!
                </a>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

}

export default ResetPassword;
