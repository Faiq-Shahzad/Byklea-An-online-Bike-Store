import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState();
  const [cnic, setCnic] = useState();
  const [phn, setPhn] = useState();
  const [email, setEmail] = useState();
  const [profile, setProfile] = useState(null);
  const [password, setPassword] = useState();

  // const addDoctor = (data) => {
  //   doctorsData([...doctors, data]);
  // };

  const addUser = async (e) => {
    e.preventDefault();
    // console.log(profile);
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("cnic", cnic);
    data.append("name", name);
    // data.append('speciality', spec);
    data.append("contact", phn);
    data.append("profile", profile);

    console.log(data);
    // try {
    //   const response = await axios.post(
    //     `${backendUrl}auth/registerDoctor`,
    //     data,
    //     {
    //       headers: {
    //         'Content-type': 'multipart/form-data',
    //       },
    //     },
    //   );

    //   console.log(response.data);
    //   alert('sucessfully registerd!');
    // } catch (e) {
    //   alert('error occured');
    //   console.log(e);
    // }
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

  return (
    // <div className="flex items-center h-full">
    //   <div className="items-center gap-3 ml-3 mt-4 flex">
    //     <RiMotorbikeFill className="text-5xl" />
    //     <span>BYKLEA</span>
    //   </div>
    //   <div className="w-1/2 bg-white rounded-lg shadow-2xl p-8 m-4 mx-auto my-auto">
    //     <div className="flex place-content-center">
    //       <FaUserPlus size={50} />
    //     </div>

    //     <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
    //       Sign Up
    //     </h1>
    //     <form>
    //       <div className="flex flex-col mb-4">
    //         <label
    //           className="mb-2 font-bold text-lg text-gray-900"
    //           htmlFor="full_name"
    //         >
    //           Full Name
    //         </label>
    //         <input
    //           className="border py-2 px-3 text-grey-800"
    //           type="text"
    //           name="full_name"
    //           id="full_name"
    //           placeholder="Azeem Ahmed"
    //           value={name}
    //           onChange={addName}
    //           required
    //         />
    //       </div>
    //       <div className="flex flex-col mb-4">
    //         <label
    //           className="mb-2 font-bold text-lg text-gray-900"
    //           htmlFor="cnic"
    //         >
    //           CNIC
    //         </label>
    //         <input
    //           className="border py-2 px-3 text-grey-800"
    //           type="number"
    //           name="cnic"
    //           id="cnic"
    //           value={cnic}
    //           onChange={addCnic}
    //           placeholder="zzzzzzzzzzzzz"
    //           required
    //         />
    //       </div>
    //       <div className="flex flex-col mb-4">
    //         <label
    //           className="mb-2 font-bold text-lg text-gray-900"
    //           htmlFor="email"
    //         >
    //           Email
    //         </label>
    //         <input
    //           className="border py-2 px-3 text-grey-800"
    //           type="email"
    //           name="email"
    //           id="email"
    //           placeholder="@gmail.com, @hotmail.com, @outlook.com ..."
    //           value={email}
    //           onChange={addEmail}
    //         />
    //       </div>
    //       <div className="flex flex-col mb-4">
    //         <label
    //           className="mb-2 font-bold text-lg text-gray-900"
    //           htmlFor="password"
    //         >
    //           Password
    //         </label>
    //         <input
    //           className="border py-2 px-3 text-grey-800"
    //           type="password"
    //           name="password"
    //           id="password"
    //           placeholder="***********"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>
    //       <div className="flex flex-col mb-4">
    //         <label
    //           className="mb-2 font-bold text-lg text-gray-900"
    //           htmlFor="phone"
    //         >
    //           Phone Number
    //         </label>
    //         <input
    //           className="border py-2 px-3 text-grey-800"
    //           type="tel"
    //           id="phone"
    //           name="phone"
    //           pattern="[0-9]{2}-[0-9]{4}-[0-9]{7}"
    //           value={phn}
    //           onChange={addPhn}
    //           required
    //         />
    //       </div>
    //       <div className="flex flex-col mb-4">
    //         <label
    //           className="mb-2 font-bold text-lg text-gray-900"
    //           htmlFor="role"
    //         >
    //           Sign Up As
    //         </label>
    //         <select className="border py-2 px-3 text-grey-800">
    //           <option>Buyer</option>
    //           <option>Seller</option>
    //           {/* <option>Others</option> */}
    //         </select>
    //       </div>
    //       <div className="flex flex-col mb-4">
    //         <label
    //           className="mb-2 font-bold text-lg text-gray-900"
    //           htmlFor="pic"
    //         >
    //           Picture
    //         </label>
    //         <input
    //           className="border py-2 px-3 text-grey-800"
    //           type="file"
    //           accept=".jpg,.jpeg,.png"
    //           name="pic"
    //           id="pic"
    //           // value={profile}
    //           onChange={(e) => setProfile(e.target.files[0])}
    //         />
    //       </div>

    //       <button
    //         className="block bg-orange-500 hover:bg-orange-400 text-white uppercase text-lg mx-auto p-4 rounded"
    //         // type="submit"
    //         onClick={(e) => {
    //           addUser(e);
    //         }}
    //       >
    //         Sign Up
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div className="h-screen grid grid-cols-3">
      <div className="hidden md:block col-span-2 my-auto mx-auto font-extrabold tracking-tight dark:text-white text-slate-900 p-10">
        <div className="flex items-end self-end space-y-7 text-9xl">
          <RiMotorbikeFill className="text-9xl text-orange-600" />
          <span>BYKLEA</span>
        </div>
      </div>
      <div className="col-span-3 bg-slate-200 md:col-span-1 md:bg-orange-600 place-content-center flex">
        <div className="bg-white m-auto rounded-xl w-2/3 p-8">
          <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900 mt-7">
            Register Your Account
          </h1>

          <form>
            <div className="flex flex-col mb-4 mt-3">
              <label
                className="mb-2 font-medium text-sm text-gray-900"
                htmlFor="full_name"
              >
                Full Name
              </label>
              <input
                className="border py-1 px-2 text-grey-800 text-sm"
                type="text"
                name="full_name"
                id="full_name"
                placeholder="Azeem Ahmed"
                value={name}
                onChange={addName}
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="mb-2 font-medium text-sm text-gray-900"
                htmlFor="cnic"
              >
                CNIC
              </label>
              <input
                className="border py-1 px-2 text-grey-800 text-sm"
                type="number"
                name="cnic"
                id="cnic"
                value={cnic}
                onChange={addCnic}
                placeholder="zzzzzzzzzzzzz"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="mb-2 font-medium text-sm text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border py-1 px-1 text-grey-800 text-sm"
                type="email"
                name="email"
                id="email"
                placeholder="@gmail.com, @hotmail.com, @outlook.com ..."
                value={email}
                onChange={addEmail}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="mb-2 font-medium text-sm text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border py-1 px-2 text-grey-800 text-sm"
                type="password"
                name="password"
                id="password"
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="mb-2 font-medium text-sm text-gray-900"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className="border py-1 px-2 text-grey-800 text-sm"
                type="tel"
                id="phone"
                name="phone"
                pattern="[0-9]{2}-[0-9]{4}-[0-9]{7}"
                value={phn}
                onChange={addPhn}
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="mb-2 font-medium text-sm text-gray-900"
                htmlFor="role"
              >
                Sign Up As
              </label>
              <select className="border py-1 px-2 text-grey-800 text-sm">
                <option>Buyer/Seller</option>
                <option>Mechanic</option>
                {/* <option>Others</option> */}
              </select>
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="mb-2 font-medium text-sm text-gray-900"
                htmlFor="pic"
              >
                Picture
              </label>
              <input
                className="border py-1 px-2 text-grey-800 text-sm"
                type="file"
                accept=".jpg,.jpeg,.png"
                name="pic"
                id="pic"
                // value={profile}
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>

            <div>
              <button
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-500 hover:bg-orange-400 py-2 px-4 text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-orange-800 focus:ring-offset-2"
                onClick={(e) => addUser(e)}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUserPlus className="h-5 w-5" aria-hidden="true" />
                </span>
                Sign Up
              </button>
            </div>

            <div className="flex items-center justify-center mt-5">
              <hr></hr>
              <div className="text-sm">
                <span>Already have an Account? </span>
                <NavLink to="/login">
                  <span className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Sign In
                  </span>
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
