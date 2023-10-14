import React, { useContext, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import { doctorsData, doctorsGrid } from "../data/DoctorsData";
import { Header } from "../components";
import { UserContext } from "../contexts/UserProvider";
import axios from "axios";
import { backendUrl } from "../constants/urls";

const Doctors = () => {
  const { data, doctor, setDoctor } = useContext(UserContext);
  const [doctorsData, setDoctorsData] = useState([]);
  const navigate = useNavigate();

  if (data.adminName == "Administration") {
    setLoggedIn(true);
  }

  const getDoctorsData = async () => {
    const res = await axios.post(`${backendUrl}doctors/search/docType/doctor`);
    setDoctorsData(res.data);
  }

  useEffect(()=>{
    getDoctorsData();
  },[])

  const handleDoctorDetails = (item) => {
    setDoctor({
      docCnic: item.Record.cnic,
      docName: item.Record.name,
      docEmail: item.Record.email,
      // docApt: item.PendingAppointments,
      // docTime: item.Timings,
      docContact: item.Record.contact,
      doctSpec: item.Record.speciality,
      docPic: item.Record.profile,
    });
    // console.log(doctor.docId)
    navigate("/doctor/details");
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Users" title="Doctors" />
      <div className="flex justify-end">
        <NavLink to="./register">
          <button className="p-2 bg-green-600 rounded-lg text-white mb-3 flex justify-between items-center font-semibold">
            <BsPlusLg className="mr-2" />
            Register Doctors
          </button>
        </NavLink>
      </div>

      <div className="">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-3 pl-2">
              <div className="relative max-w-xs">
                <label htmlFor="hs-table-search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  name="hs-table-search"
                  id="hs-table-search"
                  className="block w-full p-3 pl-10 border-1 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Search..."
                />
                <div className=" dark:text-white absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <AiOutlineSearch />
                </div>
              </div>
            </div>

            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-x border rounded-lg max-h-screen">
                <table className="min-w-full divide-y divide-gray-200 table-auto overflow-scroll w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                      >
                        Doctor ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Doctor
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Timings
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Pending Appointments
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Specialization
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
                    {doctorsData.map((item) => (
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
                          {item.Record.timeStart} - {item.Record.timeEnd}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                          {Math.floor(20 * Math.random())}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                          {item.Record.speciality}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-center">
                          <button
                            className="rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-semibold p-2"
                            onClick={() => {
                              handleDoctorDetails(item);
                            }}
                          >
                            View Details
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

export default Doctors;
