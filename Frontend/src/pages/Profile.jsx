import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import { BiEdit } from "react-icons/bi";
import { selectedData } from "@syncfusion/ej2/filemanager";
import axios from "axios";
import { backendUrl } from "../constants/urls";

const Profile = () => {
  const { data, setData } = useContext(UserContext);
  const [disable, setDisable] = useState(true);
  const [editData, seteditData] = useState({
    name: data.adminName,
    email: data.adminEmail,
    contact: data.contact,
  });

  const updateData = async (e) =>{
    // setData({adminName:editData.name, adminEmail:editData.email})
    e.preventDefault();
    console.log(editData);
    console.log(data.jwt);
    const formData = new FormData();
    formData.append('email', editData.email);
    formData.append('contact', editData.contact);
    formData.append('name', editData.name);
    try{
      const response = await axios.put(`${backendUrl}doctors/update`, editData, {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      });
      console.log(response.data);
    }catch(e){
      console.log(e.response)
    }
  }

  return (
    <div className="flex items-center h-full">
      <div className="w-1/2 bg-white rounded-lg shadow-2xl p-8 m-4 mx-auto my-auto">
        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
          My Profile
        </h1>
        <div className="flex place-content-end">
          <BiEdit size={30} onClick={() => setDisable(false)} />
        </div>

        <form action="/">
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              for="full_name"
            >
              Full Name
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="text"
              name="full_name"
              id="full_name"
              disabled={disable}
              value={editData.name}
              onChange={(event) => seteditData({...editData, name: event.target.value})}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900" for="cnic">
              CNIC
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="text"
              name="cnic"
              id="cnic"
              placeholder="XXXXX-XXXXXXX-X"
              disabled={true}
              value={data.cnic}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900" for="email">
              Email
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="email"
              name="email"
              id="email"
              disabled={disable}
              value={editData.email}
              onChange={(event) => seteditData({...editData, email: event.target.value})}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900" for="phone">
              Phone Number
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="tel"
              id="phone"
              name="phone"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
              disabled={disable}
              value={editData.contact}
              onChange={(event) => seteditData({...editData, contact: event.target.value})}
            />
          </div>
          {/* <div className="flex flex-col mb-4">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              for="gender"
            >
              Gender
            </label>
            <select className="border py-2 px-3 text-grey-800">
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </div> */}

          {/* <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900" for="pic">
              Picture
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="file"
              accept=".jpg,.jpeg,.png"
              name="pic"
              id="pic"
              disabled={disable}
              value={data.adminName}
            />
          </div> */}
          {/* <div className="flex flex-col mb-4">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              for="specialization"
            >
              Specialization
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              name="specialization"
              id="specialization"
              disabled={disable}
            />
          </div> */}

          <button
            className="block bg-green-500 hover:bg-green-600 text-white uppercase text-lg mx-auto p-4 rounded"
            // type="submit"
            disabled={disable}
            onClick={(e) => {
              updateData(e);
            }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
