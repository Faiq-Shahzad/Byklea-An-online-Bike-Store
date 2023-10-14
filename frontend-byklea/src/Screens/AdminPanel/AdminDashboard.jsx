import React, { useContext } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { UserContext } from "../../contexts/UserProvider";
import { NavLink } from "react-router-dom";

const AdminDashboard = () =>{
  const { currentColor, currentMode } = useStateContext();
  const { data, setData } = useContext(UserContext);
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  if (data.adminName == "Administration") {
    setLoggedIn(true);
  }

  return (
    <div className="mt-9">
      <div className="dark:text-gray-400 p-8">
      <h3 className="text-xl">Hospital</h3>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <NavLink to="/appointments">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3">
              <button
                type="button"
                style={{ backgroundColor: currentColor }}
                className=" opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4"
              >
                {/* <EventAvailableIcon /> */}
              </button>
              <div className="mt-3">
                <p className="text-2xl">5,300</p>
                <p className="font-bold text-gray-400">Appointments</p>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* {earningData.map((item) => (
            <NavLink to={item.link}>
              <div
                key={item.title}
                className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
              >
                <button
                  type="button"
                  style={{
                    color: item.iconColor,
                    backgroundColor: item.iconBg,
                  }}
                  className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                >
                  {item.icon}
                </button>
                <p className="mt-3">
                  <span className="text-lg font-semibold">{item.amount}</span>
                  <span className={`text-sm text-${item.pcColor} ml-2`}>
                    {item.percentage}
                  </span>
                </p>
                <p className="text-sm text-gray-400  mt-1">{item.title}</p>
              </div>
            </NavLink>
          ))} */}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">
                Hospital Reviews
              </p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">1,500</p>
                <p className="text-gray-200">Total Reviews</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">Best Doctor</p>
              <p className="text-gray-400">Dr. Ali Khan</p>
            </div>

            <div className="w-40">
              <img
                className="rounded-full w-30 h-30 place-content-center"
                src={require("../../data/avatar.jpg")}
                alt="doctor"
              />
            </div>
          </div>
        </div>
        {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Appointment Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Patients</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Appointments</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">5,300</span>
                </p>
                <p className="text-gray-500 mt-1">Appointments</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">4,396</p>

                <p className="text-gray-500 mt-1">Patients</p>
              </div>
            </div>

          </div>
        </div> */}
      </div>

    </div>
  );
};

export default AdminDashboard
