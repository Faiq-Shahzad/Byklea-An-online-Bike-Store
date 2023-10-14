import axios from 'axios';
import React, { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { backendUrl } from '../constants/urls';
import { doctorsData } from '../data/DoctorsData';

const RegisterDoctor = () => {
  const [name, setName] = useState();
  const [cnic, setCnic] = useState();
  const [phn, setPhn] = useState();
  const [email, setEmail] = useState();
  const [spec, setSpec] = useState();
  const [timeStart, setTimeStart] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [profile, setProfile] = useState(null);
  const [password, setPassword] = useState();

  const [doctors, setDoctors] = useState(doctorsData);

  // const addDoctor = (data) => {
  //   doctorsData([...doctors, data]);
  // };

  const addDoctor = async (e) => {
    e.preventDefault();
    // console.log(profile);
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('cnic', cnic);
    data.append('name', name);
    data.append('speciality', spec);
    data.append('contact', phn);
    data.append('timeStart', timeStart);
    data.append('timeEnd', timeEnd);
    data.append('profile', profile);

    console.log(data);
    try {
      const response = await axios.post(
        `${backendUrl}auth/registerDoctor`,
        data,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      );

      console.log(response.data);
      alert('sucessfully registerd!');
    } catch (e) {
      alert('error occured');
      console.log(e);
    }
  };

  const addName = (event) => {
    setName(event.target.value);
  };

  const addCnic = (event) => {
    setCnic(event.target.value);
  };

  const addPhn = (event) => {
    setPhn(event.target.value);
  };

  const addEmail = (event) => {
    setEmail(event.target.value);
  };

  const addSpec = (event) => {
    setSpec(event.target.value);
  };

  const addTimeStart = (event) => {
    setTimeStart(event.target.value);
  };
  const addTimeEnd = (event) => {
    setTimeEnd(event.target.value);
  };

  return (
    <div className="flex items-center h-full">
      <div className="w-1/2 bg-white rounded-lg shadow-2xl p-8 m-4 mx-auto my-auto">
        <div className="flex place-content-center">
          <FaUserPlus size={50} />
        </div>

        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
          Register Doctor
        </h1>
        <form>
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="full_name"
            >
              Full Name
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="text"
              name="full_name"
              id="full_name"
              value={name}
              onChange={addName}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="cnic">
              CNIC
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="number"
              name="cnic"
              id="cnic"
              value={cnic}
              onChange={addCnic}
              placeholder="XXXXX-XXXXXXX-X"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="email">
              Email
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={addEmail}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="password">
              Password
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="tel"
              id="phone"
              name="phone"
              pattern="[0-9]{2}-[0-9]{4}-[0-9]{7}"
              value={phn}
              onChange={addPhn}
              required
            />
          </div>
          {/* <div className="flex flex-col mb-4">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className="border py-2 px-3 text-grey-800"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </div> */}
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="time">
              Time Slot
            </label>
            <div className="flex flex-row mb-4 justify-around">
              <input
                className="border py-2 px-3 text-grey-800"
                type="time"
                name="time"
                id="time"
                value={timeStart}
                onChange={addTimeStart}
              />
              TO
              <input
                className="border py-2 px-3 text-grey-800"
                type="time"
                name="time"
                id="time"
                value={timeEnd}
                onChange={addTimeEnd}
              />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="pic">
              Picture
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="file"
              accept=".jpg,.jpeg,.png"
              name="pic"
              id="pic"
              // value={profile}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="specialization"
            >
              Specialization
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              name="specialization"
              id="specialization"
              value={spec}
              onChange={addSpec}
            />
          </div>

          <button
            className="block bg-green-500 hover:bg-green-600 text-white uppercase text-lg mx-auto p-4 rounded"
            // type="submit"
            onClick={(e) => {
              addDoctor(e);
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterDoctor;
