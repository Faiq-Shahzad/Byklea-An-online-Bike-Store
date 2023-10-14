import React, { useContext, useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { doctorsData, doctorsGrid } from "../data/DoctorsData";
import axios from 'axios';
import { Header } from '../components';
import { UserContext } from '../contexts/UserProvider';
import { backendUrl } from '../constants/urls';

const MedicalAccess = () => {
  const { data, selectedPatient, setSelectedPatient } = useContext(UserContext);
  const [pendingData, setPendingData] = useState([]);
  const [authData, setAuthData] = useState([]);
  const [requestId, setRequestId] = useState([]);
  const navigate = useNavigate();

  //   if (data.adminName == "Administration") {
  //     setLoggedIn(true);
  //   }

  const getPendingData = async () => {
    const res = await axios.get(`${backendUrl}doctors/checkACL/request/`, {
      headers: {
        Authorization: `Bearer ${data.jwt}`,
      },
    });
    setPendingData(res.data);
  };

  const getAuthData = async () => {
    const res = await axios.get(`${backendUrl}doctors/checkACL/auth/`, {
      headers: {
        Authorization: `Bearer ${data.jwt}`,
      },
    });
    setAuthData(res.data);
  };

  

  const refresh = async () => {
    await getPendingData();
    await getAuthData();
  }

  const sendRequest = async () => {
    try {
        // console.log('sending request with jwt', data.jwt);
      const res = await axios.post(`${backendUrl}doctors/requestAccess/${requestId}`, {}, {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      });
      console.log(res.data);
      refresh();
      alert(res.data.message);
    } catch (e) {
      console.log(e);
      if (e.response) {
        console.log(e.response.message);
        alert(e.response.message);
      }
    }
  };

  useEffect(() => {
    getPendingData();
    getAuthData();
  }, []);

  const handleCreatePriscription = (item) => {
    setSelectedPatient({
      cnic: item.cnic,
      name: item.name,
      email: item.email,
      // docApt: item.PendingAppointments,
      // docTime: item.Timings,
      contact: item.contact,
      dob: item.dob,
      profile: item.profile,
      gender: item.gender,
    });
    // console.log(doctor.docId)
    navigate('/doctor/eprescription');
  };

  const handleViewHistory = (item) => {
    setSelectedPatient({
      cnic: item.cnic,
      name: item.name,
      email: item.email,
      // docApt: item.PendingAppointments,
      // docTime: item.Timings,
      contact: item.contact,
      dob: item.dob,
      profile: item.profile,
      gender: item.gender,
    });
    // console.log(doctor.docId)
    navigate('/doctor/medicalHistory');
  };
  

  // handleCreatePriscription(item.Record);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Patients" title="Medical Access" />
      <div className="flex justify-end">
        {/* <NavLink to="./register"> */}
        <div className="relative max-w-xs">
          <label htmlFor="hs-table-request" className="sr-only">
            Request
          </label>
          <input
            type="text"
            name="hs-table-patient"
            id="hs-table-patient"
            className="block w-full p-3 pl-10 border-1 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            placeholder="patient id"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
          />

        </div>
        <button className="p-2 bg-green-600 rounded-lg text-white mb-3 flex justify-between items-center font-semibold"
            onClick={()=> sendRequest()}>
          <BsPlusLg className="mr-2" />
          Request Patient
        </button>
        {/* </NavLink> */}
      </div>

      <div className="">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-3 pl-2">
              <div className="relative max-w-xs">
                <button className="p-2 bg-green-600 rounded-lg text-white mb-3 flex justify-between items-center font-semibold"
                    onClick={()=> refresh()}>
                Refresh
                </button>
              </div>
            </div>
            <div className='my-2'> Pending Requests</div>
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-x border rounded-lg max-h-screen">
                <table className="min-w-full divide-y divide-gray-200 table-auto overflow-scroll w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                      >
                        Patient Cnic
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Patient
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        BloodGroup
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Emergency Contact
                      </th>
                      {/* <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200  overflow-y overflow-scroll">
                    {pendingData.map((item) => (
                      <tr className="hover:bg-gray-200">
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                          {item.Record.cnic}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap place-content-center">
                          <div className="image flex gap-4">
                            <img
                              className="rounded-full w-10 h-10"
                              src={`data:image/jpeg;base64,${item.Record.profile}`}
                              alt="doctor"
                            />
                            <div className="place-content-start">
                              <p>{item.Record.name}</p>
                              <p>{item.Record.contact}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                          {item.Record.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                          {item.Record.bloodGroup}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                          {item.Record.emergencyContact}
                        </td>
                        {/* <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-center">
                          <button
                            className="rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-semibold p-2"
                            onClick={() => {
                              handleDoctorDetails(item);
                            }}
                          >
                            View Details
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className='my-2'> Authorized Patients</div>
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-x border rounded-lg max-h-screen">
                <table className="min-w-full divide-y divide-gray-200 table-auto overflow-scroll w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                      >
                        Patient Cnic
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Patient
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        BloodGroup
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Emergency Contact
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200  overflow-y overflow-scroll">
                    {authData.map((item) => (
                      <tr className="hover:bg-gray-200">
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                          {item.Record.cnic}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap place-content-center">
                          <div className="image flex gap-4">
                            <img
                              className="rounded-full w-10 h-10"
                              src={`data:image/jpeg;base64,${item.Record.profile}`}
                              alt="doctor"
                            />
                            <div className="place-content-start">
                              <p>{item.Record.name}</p>
                              <p>{item.Record.contact}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                          {item.Record.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                          {item.Record.bloodGroup}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                          {item.Record.emergencyContact}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-center">
                          <button
                            className="rounded-lg bg-gray-400 mx-2 hover:bg-gray-500 text-white font-semibold p-2"
                            onClick={() => {
                              console.log(item.Record);
                              const select = item.Record;
                              handleCreatePriscription(select);
                            }}
                          >
                            Create Record
                          </button>

                          <button
                            className="rounded-lg mx-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold p-2"
                            onClick={() => {
                              console.log(item.Record);
                              const select = item.Record;
                              handleViewHistory(select);
                            }}
                          >
                            View Medical History
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalAccess;
