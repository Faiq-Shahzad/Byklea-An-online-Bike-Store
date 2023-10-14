import React, { useContext, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { UserContext } from "../contexts/UserProvider";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiHospitalFill } from "react-icons/ri";
import axios from "axios";
import { backendUrl } from "../constants/urls";

const Login = () => {
  const { setLoggedIn, setData } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [choice, setChoice] = useState("doctor");

  setLoggedIn(false);

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        choice == AdminData.role
      ) {
        // console.log('sending request .. ', `${backendUrl}auth/loginHospitalAdmin`);
        // const response = await axios.post(`${backendUrl}auth/loginHospitalAdmin`, {
        //   cnic: email,
        //   password,
        // });
        console.log(' request .. ');
        console.log(response.data);
        const resData = response.data;
        
        setData({
          adminName: 'admin',
          adminEmail: resData.user.email,
          adminPic: resData.userData.profile,
          adminRole: resData.user.role,
          cnic: '123123123',
          contact: '213213123',
          jwt: resData.token,
        });
        console.log('loggin in admin');
        setLoggedIn(true);
        navigate("/dashboard");
      }

      else if (
        choice == 'doctor'
      ) {
        // console.log('sending request .. ', `${backendUrl}auth/loginDoctor`);
        // const response = await axios.post(`${backendUrl}auth/loginDoctor`, {
        //   cnic: email,
        //   password,
        // });
        // console.log(' request .. ');
        // console.log(response.data);
        // const resData = response.data;
        
        // setData({
        //   adminName: resData.userData.name,
        //   adminEmail: resData.user.email,
        //   adminPic: resData.userData.profile,
        //   adminRole: resData.user.role,
        //   cnic: resData.userData.cnic,
        //   contact: resData.userData.contact,
        //   jwt: resData.token,
        // });
        setData({
          adminName: "Faiq",
          adminEmail: "faiq@mail.com",
          // adminPic: resData.userData.profile,
          adminRole: 'Doctor',
          cnic: '111111111111',
          contact: '1212121212',
          // jwt: resData.token,
        });
        console.log('loggin in doctor');
        setLoggedIn(true);
        navigate("/doctor/dashboard");
      }

      else if (
        choice == 'assistant'
      ) {
        console.log('sending request .. ', `${backendUrl}auth/loginPA`);
        const response = await axios.post(`${backendUrl}auth/loginPA`, {
          cnic: email,
          password,
        });
        console.log(' request .. ');
        console.log(response.data);
        const resData = response.data;
        
        setData({
          adminName: resData.userData.name,
          adminEmail: resData.user.email,
          adminPic: resData.userData.profile,
          adminRole: resData.user.role,
          cnic: resData.userData.cnic,
          contact: resData.userData.contact,
          jwt: resData.token,
        });
        console.log('loggin in pa');
        setLoggedIn(true);
        navigate("/doctor/dashboard");
      }
      // } else if (
      //   email == DoctorData.email &&
      //   password == DoctorData.password &&
      //   choice == DoctorData.role
      // ) {
      //   setLoggedIn(true);
      //   setData({
      //     adminName: DoctorData.uname,
      //     adminEmail: DoctorData.email,
      //     adminPic: DoctorData.pic,
      //     adminRole: DoctorData.role,
      //   });
      //   console.log(choice);
      //   navigate("/doctor/dashboard");
      // } else if (
      //   email == AssistantData.email &&
      //   password == AssistantData.password &&
      //   choice == AssistantData.role
      // ) {
      //   setLoggedIn(true);
      //   setData({
      //     adminName: AssistantData.uname,
      //     adminEmail: AssistantData.email,
      //     adminPic: AssistantData.pic,
      //     adminRole: AssistantData.role,
      //   });

      //   console.log(choice);
      //   navigate("/assistant/dashboard");
      // }
    } catch (e) {
      // if (e.response && e.response.status >= 400 && e.response.status <= 500)
      //   setError(error.response.data.message);
      console.log(e);
      alert('invalid credentails');
      // console.log(e.response);
      // setError(e.response.message);
    }
  };

  const handleChoice = (event) => {
    setChoice(event.target.value);
  };

  const AdminData = {
    email: "faiq@mail.com",
    password: "12345",
    uname: "Faiq",
    pic: "avatar.jpg",
    role: "Administration",
  };

  const DoctorData = {
    email: "ahmed@mail.com",
    password: "12345",
    uname: "Ahmed",
    pic: "avatar.jpg",
    role: "doctor",
  };

  const AssistantData = {
    email: "assistant@mail.com",
    password: "12345",
    uname: "Assistant",
    pic: "avatar.jpg",
    role: "assistant",
  };

  return (
    <div className="h-screen grid grid-cols-3">
      <div className="hidden md:block col-span-2 p-7 text-4xl font-extrabold tracking-tight dark:text-white text-slate-900">
        <div className="items-center gap-3 ml-3 mt-4 flex">
          <RiHospitalFill className="text-5xl" />
          <span>MedCom</span>
        </div>

        <div className="flex items-end self-end space-y-7">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            // pagination={{
            //   clickable: true,
            // }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide className="flex justify-center">
              <img
                className="w-2/3 h-2/3"
                src={require("../data/fp1.png")}
                alt="image slide 1"
              />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <img
                className="w-2/3 h-2/3"
                src={require("../data/fp2.png")}
                alt="image slide 2"
              />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <img
                className="w-2/3 h-2/3"
                src={require("../data/fp3.png")}
                alt="image slide 3"
              />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <img
                className="w-2/3 h-2/3"
                src={require("../data/fp4.png")}
                alt="image slide 4"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="col-span-3 bg-slate-200 md:col-span-1 md:bg-gray-600 place-content-center flex">
        <div className="bg-white m-auto rounded-xl w-2/3 p-8">
          <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900 mt-7">
            Sign In to Your Account
          </h1>

          <form className="mt-2 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="block p-3 pb-8 font-semibold mx-auto my-auto">
                <div>
                  <input
                    type="radio"
                    value="doctor"
                    checked={choice === "doctor"}
                    onChange={handleChange}
                  />{" "}
                  Doctor
                </div>
                <div>
                  <input
                    type="radio"
                    value="Administration"
                    checked={choice === "Administration"}
                    onChange={handleChange}
                  />{" "}
                  Admin
                </div>
                <div>
                  <input
                    type="radio"
                    value="assistant"
                    checked={choice === "assistant"}
                    onChange={handleChange}
                  />{" "}
                  Assistant
                </div>
              </div>

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            <div className="flex items-end justify-end">
              <NavLink to="/resetpassword">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </NavLink>
            </div>

            <div>
              {error && <div className="p-4 font-bold">{error}</div>}
              <button

                // type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={(e) => loginHandler(e)}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
              {/* </NavLink> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
