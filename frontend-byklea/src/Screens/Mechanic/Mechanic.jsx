import React, { useContext, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineEngineering } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import { doctorsData, doctorsGrid } from "../data/DoctorsData";
// import { Header } from "../components";
import { UserContext } from "../../contexts/UserProvider";
import axios from "axios";
// import { backendUrl } from "../constants/urls";

const Mechanic = () => {
  const { data, mechanic, setMechanic } = useContext(UserContext);
  // const [doctorsData, setDoctorsData] = useState([]);
  const navigate = useNavigate();

  // if (data.adminName == "Administration") {
  //   setLoggedIn(true);
  // }

  // const getDoctorsData = async () => {
  //   const res = await axios.post(`${backendUrl}doctors/search/docType/doctor`);
  //   setDoctorsData(res.data);
  // };

  // useEffect(() => {
  //   // getDoctorsData();
  // }, []);

  const mechanicData = [
    {
      id: 11012,
      name: "Ali Khan",
      email: "alikhan@gmail.com",
      contact: "0331-5558447",
      speciality: "Electrician",
      priceRange: "1500-2000",
      ratings: 4,
    },
    {
      id: 11013,
      email: "azeemahmed@gmail.com",
      contact: "0331-5558447",
      name: "Azeem Ahmed",
      speciality: "Oil Mechanic",
      priceRange: "1500-2000",
      ratings: 4,
    },
  ];

  const viewDetails = (item) => {
    setMechanic({
      mechanicID: item.id,
      mechanicName: item.name,
      mechanicEmail: item.email,
      mechanicPhn: item.contact,
      mechanicPrice: item.priceRange,
      mechanicRatings: item.ratings,
      mechanicPic: item.pic,
    });
    navigate("/mechanics/details");
  };

  return (
    <div className="mt-9">
      <div className="dark:text-gray-400 text-orange-600 p-8 flex">
        <MdOutlineEngineering size={50} />
        <h1 className="text-3xl font-bold text-orange-600 my-auto ml-3">
          Mechanics
        </h1>
      </div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        {/* <Header category="Users" title="Doctors" /> */}

        {data.role == "admin" ? (
          <div className="flex justify-end">
            <NavLink to="./postAd">
              <button className="p-2 bg-orange-600 rounded-lg text-white mb-3 flex justify-between items-center font-semibold">
                <BsPlusLg className="mr-2" size={24} />
                New Ad
              </button>
            </NavLink>
          </div>
        ) : (
          <></>
        )}

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
                          Mechanic ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                        >
                          Name
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                        >
                          Contact
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                        >
                          Ratings
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                        >
                          Price Range
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
                      {mechanicData.map((item) => (
                        <tr className="hover:bg-gray-200">
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                            {item.id}
                          </td>
                          <td className="mx-auto text-sm text-gray-800 whitespace-nowrap place-content-center">
                            <div className="image flex gap-4">
                              <img
                                className="rounded-full w-10 h-10"
                                src={require("../../data/fm1.png")}
                                alt="doctor"
                              />
                              <div className="">
                                <p>{item.name}</p>
                                <p>{item.email}</p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                            {item.contact}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                            {item.ratings}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                            {item.priceRange}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-center">
                            <button
                              className="rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-semibold p-2"
                              onClick={() => viewDetails(item)}
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
    </div>
  );
};

export default Mechanic;
