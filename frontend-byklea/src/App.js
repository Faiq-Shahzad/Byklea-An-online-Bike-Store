import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "./contexts/ContextProvider";
import { UserContext } from "./contexts/UserProvider";
import Login from "./Screens/UserProfiling/Login";

import {
  Navbar,
  Footer,
  Sidebar,
  SidebarMechanic,
  SidebarUser,
  ThemeSettings,
} from "./components";
import AdminDashboard from "./Screens/AdminPanel/AdminDashboard";
import SignUp from "./Screens/UserProfiling/SignUp";
import UserDashboard from "./Screens/Dashboard/UserDashboard";
import MechanicDashboard from "./Screens/Dashboard/MechanicDashboard";
import Setting from "./Screens/Settings/Settings";
import PostAd from "./Screens/Ads/PostAd";
import MyAds from "./Screens/Ads/MyAds";
import AdDetails from "./Screens/Ads/AdDetails";
import Mechanic from "./Screens/Mechanic/Mechanic";
import MechanicDetails from "./Screens/Mechanic/MechanicDetails";
import BikeAds from "./Screens/Ads/BikeAds";
import PartsAds from "./Screens/Ads/PartsAds";
import PartsDetails from "./Screens/Ads/PartsDetails";
import AdComparison from "./Screens/Ads/AdComparison";

function App() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState();
  const [myProd, setMyProd] = useState();
  const [mechanic, setMechanic] = useState();
  // const [selectedPatient, setSelectedPatient] = useState();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <UserContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          data,
          setData,
          myProd,
          setMyProd,
          mechanic,
          setMechanic
        }}
      >
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg ">
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: "50%" }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>

            {activeMenu && data && data.role === "admin" ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <></>
            )}

            {activeMenu && data && data.role === "user" ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <SidebarUser />
              </div>
            ) : (
              <></>
            )}

            {activeMenu && data && data.adminRole === "pa" ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <SidebarMechanic />
              </div>
            ) : (
              <></>
            )}

            <div
              className={
                activeMenu && data
                  ? "dark:bg-main-dark-bg  bg-slate-100 min-h-screen md:ml-72 w-full  "
                  : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
              }
            >
              {data ? (
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar />
                </div>
              ) : (
                <div></div>
              )}

              <div>
                {themeSettings && <ThemeSettings />}

                <Routes>
                  {/* login */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />

                  {/* Admin Dashboard */}
                  <Route path="/adminDashboard" element={<AdminDashboard />} />
                  {data && data.role == "admin" ? (
                    <Route path="/" element={<AdminDashboard />} />
                  ) : (
                    <Route
                      path="/"
                      element={<Navigate replace to="/login" />}
                    />
                  )}

                  <Route path="/userDashboard" element={<UserDashboard />} />
                  {data && data.role == "user" ? (
                    <Route path="/" element={<UserDashboard />} />
                  ) : (
                    <Route
                      path="/"
                      element={<Navigate replace to="/userDashboard" />}
                    />
                  )}

                  <Route
                    path="/mechanicDashboard"
                    element={<MechanicDashboard />}
                  />
                  {data && data.role == "mechanic" ? (
                    <Route path="/" element={<MechanicDashboard />} />
                  ) : (
                    <Route
                      path="/"
                      element={<Navigate replace to="/mechanicDashboard" />}
                    />
                  )}

                  <Route path="/myads/postad" element={<PostAd />} />
                  <Route path="/myads" element={<MyAds />} />
                  <Route path="/myads/details" element={<AdDetails />} />
                  <Route path="/mechanics" element={<Mechanic />} />
                  <Route path="/mechanics/details" element={<MechanicDetails />} />
                  <Route path="/settings" element={<Setting />} />


                  <Route path="/myads/postad" element={<PostAd />} />
                  <Route path="/myads" element={<MyAds />} />
                  <Route path="/myads/details" element={<AdDetails />} />
                  <Route path="/mechanics" element={<Mechanic />} />
                  <Route path="/mechanics/details" element={<MechanicDetails />} />
                  <Route path="/bikeads" element={<BikeAds />} />
                  <Route path="/bikeads/comparison" element={<AdComparison />} />
                  <Route path="/bikeads/details" element={<BikeAds />} />
                  <Route path="/partsads" element={<PartsAds />} />
                  <Route path="/partsads/details" element={<PartsDetails />} />
                  <Route path="/settings" element={<Setting />} />
                </Routes>
              </div>
              {loggedIn ? <Footer /> : <div></div>}
            </div>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
