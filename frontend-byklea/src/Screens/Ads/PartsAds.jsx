import React, { useState, useContext } from "react";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

const PartsAds = () => {
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

  return (
    <>
      <div className="mt-14 ml-8">
        <div className="dark:text-gray-400 text-orange-600 p-8 flex">
          <HiOutlineWrenchScrewdriver size={50} />
          <h1 className="text-3xl font-bold text-orange-600 my-auto ml-3">
            Parts Ads
          </h1>
        </div>
        <div id="slider" className="w-full">
          {bikeData.map((item) => (
            <div className="bg-white w-[360px] h-[250px] ml-8 mb-8 inline-block p-5 cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-md">
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
      </div>
    </>
  );
};

export default PartsAds
