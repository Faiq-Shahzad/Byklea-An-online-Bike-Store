import React, {useState, useContext} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { TbMotorbike } from "react-icons/tb";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { UserContext } from "../../contexts/UserProvider";


const UserDashboard = () => {

  const { setLoggedIn, data, setData } = useContext(UserContext);
  const bikeData = [
    {
      name: "Honda 70",
      color: "red",
      price: 90000,
      image: "../../data/fm1.png",
    },
    {
      name: "Honda 70",
      color: "red",
      image: "../../data/fm2.png",
    },
    {
      name: "Honda 70",
      color: "red",
      image: "../../data/fm3.png",
    },
    {
      name: "Honda 70",
      color: "red",
      image: "../../data/fm4.png",
    },
    {
      name: "Honda 70",
      color: "red",
      image: "../../data/fm5.png",
    },
    {
      name: "Honda 70",
      color: "red",
      image: "../../data/fm1.png",
    },
    {
      name: "Honda 70",
      color: "red",
      image: "../../data/fm2.png",
    },
    {
      name: "Honda 70",
      color: "red",
      image: "../../data/fm3.png",
    },
    {
      name: "Honda 70",
      color: "red",
      image: "../../data/fm4.png",
    },
    {
      name: "Honda 70",
      color: "red",
      image: "../../data/fm5.png",
    },
  ];

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
    console.log(data._id);
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const slideLeft1 = () => {
    var slider = document.getElementById("slider1");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight1 = () => {
    var slider = document.getElementById("slider1");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <div className="mt-14 ml-8 mb-8">
      <div className="dark:text-gray-400 text-orange-600 p-8 flex">
          <TbMotorbike size={50} />
          <h1 className="text-3xl font-bold text-orange-600 my-auto ml-3">
            Bike Recommendations
          </h1>
        </div>

        <div className="relative flex items-center max-w-screen-2xl">
          <MdChevronLeft onClick={slideLeft} size={40} />
          <div
            id="slider"
            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {bikeData.map((item) => (
              <div className="bg-white w-[360px] h-[250px] ml-8 inline-block p-5 cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-md">
                <img
                  className="h-[140px] w-[300px] flex place-self-center"
                  src={require("../../data/fm2.png")}
                  alt="im"
                />
                <h1 className="mt-5 font-semibold text-orange-600">
                  Title: {item.name}
                </h1>
                <h1>Price: {item.price}</h1>
              </div>
            ))}
          </div>
          <MdChevronRight onClick={slideRight} size={40} />
        </div>
      </div>

      
      <hr></hr>


      <div className="mt-5 ml-8">
      <div className="dark:text-gray-400 text-orange-600 p-8 flex">
          <HiOutlineWrenchScrewdriver size={50} />
          <h1 className="text-3xl font-bold text-orange-600 my-auto ml-3">
            Bike Parts
          </h1>
        </div>

        <div className="relative flex items-center max-w-screen-2xl">
          <MdChevronLeft onClick={slideLeft1} size={40} />
          <div
            id="slider1"
            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {bikeData.map((item) => (
              <div className="bg-white w-[360px] h-[250px] ml-8 inline-block p-5 cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-md">
                <img
                  className="h-[140px] w-[300px] flex place-self-center"
                  src={require("../../data/fm1.png")}
                  alt="im"
                />
                <h1 className="font-semibold text-orange-600">
                  Title: {item.name}
                </h1>
                <h1>Price: {item.price}</h1>
              </div>
            ))}
          </div>
          <MdChevronRight onClick={slideRight1} size={40} />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
