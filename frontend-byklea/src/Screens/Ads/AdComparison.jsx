import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserProvider";
import { MdOutlineCompare } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const AdComparison = () => {
  const { data, myProd, setDoctor } = useContext(UserContext);
  const [disable, setDisable] = useState(true);

  return (
    <div className="mt-9">
      <div className="dark:text-gray-400 text-orange-600 p-8 flex">
        <MdOutlineCompare size={50} />
        <h1 className="text-3xl font-bold text-orange-600 my-auto ml-3">
          Ad Comparison
        </h1>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <div className="py-3 w-4/5 my-auto mx-auto">
            <div className="relative">
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
          <div className="w-4/5 bg-white-200 rounded-lg shadow-2xl p-8 m-4 mx-auto my-auto bg-white">
            <form className="place-content-center">
              <fieldset className="mt-4 border-1 border-black rounded-md p-4 text-lg text-gray-900 mx-auto my-auto">
                <legend className="font-bold">Details</legend>
                <div className="flex font-semibold justify-end w-full">
                  <label className="mr-2">Date: </label>
                  <input type="text" value={"24 - 10 - 2023"} disabled />
                </div>
                <div className="mt-3">
                  <div className="mb-4">
                    <div>
                      <label
                        className="mb-2 mr-3 font-semibold text-lg text-gray-900"
                        htmlFor="dosage"
                      >
                        Product Name
                      </label>
                      <div>
                        <input
                          className="border py-2 px-3 text-grey-800 w-3/4"
                          type="text"
                          placeholder="Product Name"
                          required
                          disabled={disable}
                          // value={myProd.prodName}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="mb-2 mr-3 font-semibold text-lg text-gray-900 w-28 "
                        htmlFor=""
                      >
                        Year
                      </label>
                      <div>
                        <input
                          className="border py-2 px-3 text-grey-800 w-3/4"
                          type="text"
                          placeholder="Year"
                          required
                          // value={myProd.prodModel}
                          disabled={disable}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div>
                      <label
                        className="mb-2 mr-3 font-semibold text-lg text-gray-900"
                        htmlFor="dosage"
                      >
                        Color
                      </label>
                      <div>
                        <input
                          className="border py-2 px-3 text-grey-800 w-3/4"
                          type="text"
                          placeholder="Color"
                          required
                          // value={myProd.prodColor}
                          disabled={disable}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="mb-2 mr-3 font-semibold text-lg text-gray-900 w-28 "
                        htmlFor=""
                      >
                        Condition
                      </label>
                      <div>
                        <input
                          className="border py-2 px-3 text-grey-800 w-3/4"
                          type="number"
                          min={0}
                          max={10}
                          placeholder="/10"
                          required
                          // value={myProd.prodCondition}
                          disabled={disable}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" mb-4">
                    <div>
                      <label
                        className="mb-2 mr-3 font-semibold text-lg text-gray-900"
                        htmlFor="dosage"
                      >
                        Picture
                      </label>
                      <div>
                        <input
                          className="border py-1 px-2 text-grey-800 text-sm"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          name="pic"
                          id="pic"
                          multiple
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="mb-2 mr-3 font-semibold text-lg text-gray-900 w-28 "
                        htmlFor=""
                      >
                        Price (PKR)
                      </label>
                      <div>
                        <input
                          className="border py-2 px-3 text-grey-800 w-3/4"
                          type="number"
                          min={0}
                          placeholder="90000"
                          required
                          // value={myProd.prodPrice}
                          disabled={disable}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mb-4 font-semibold">
                    <label>Comments</label>
                    <textarea
                      className="px-3 py-2 text-grey-800 border-2"
                      rows="4"
                      cols="50"
                      placeholder="Comments..."
                      disabled={disable}
                    />
                  </div>
                </div>

                {/* <button
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-500 hover:bg-orange-400 py-2 px-4 text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-orange-800 focus:ring-offset-2"
              disabled={disable}
            >
              Update
            </button> */}
              </fieldset>
            </form>
          </div>
        </div>
        <div>
          <div className="py-3 w-4/5 my-auto mx-auto">
            <div className="relative">
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
          <div className="w-4/5 bg-white-200 rounded-lg shadow-2xl p-8 m-4 mx-auto my-auto bg-white">
            <form className="place-content-center">
              <fieldset className="mt-4 border-1 border-black rounded-md p-4 text-lg text-gray-900 mx-auto my-auto">
                <legend className="font-bold">Details</legend>
                <div className="flex font-semibold justify-end w-full">
                  <label className="mr-2">Date: </label>
                  <input type="text" value={"24 - 10 - 2023"} disabled />
                </div>
                <div className="mt-3">

                  <div className="mb-4">
                    <div>
                      <label
                        className="mb-2 mr-3 font-semibold text-lg text-gray-900"
                        htmlFor="dosage"
                      >
                        Product Name
                      </label>
                      <div>
                        <input
                          className="border py-2 px-3 text-grey-800 w-3/4"
                          type="text"
                          placeholder="Product Name"
                          required
                          disabled={disable}
                          // value={myProd.prodName}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="mb-2 mr-3 font-semibold text-lg text-gray-900 w-28 "
                        htmlFor=""
                      >
                        Year
                      </label>
                      <div>
                        <input
                          className="border py-2 px-3 text-grey-800 w-3/4"
                          type="text"
                          placeholder="Year"
                          required
                          // value={myProd.prodModel}
                          disabled={disable}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div>
                      <label
                        className="mb-2 mr-3 font-semibold text-lg text-gray-900"
                        htmlFor="dosage"
                      >
                        Color
                      </label>
                      <div>
                        <input
                          className="border py-2 px-3 text-grey-800 w-3/4"
                          type="text"
                          placeholder="Color"
                          required
                          // value={myProd.prodColor}
                          disabled={disable}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="mb-2 mr-3 font-semibold text-lg text-gray-900 w-28 "
                        htmlFor=""
                      >
                        Condition
                      </label>
                      <div>
                        <input
                          className="border py-2 px-3 text-grey-800 w-3/4"
                          type="number"
                          min={0}
                          max={10}
                          placeholder="/10"
                          required
                          // value={myProd.prodCondition}
                          disabled={disable}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" mb-4">
                    <div>
                      <label
                        className="mb-2 mr-3 font-semibold text-lg text-gray-900"
                        htmlFor="dosage"
                      >
                        Picture
                      </label>
                      <div>
                        <input
                          className="border py-1 px-2 text-grey-800 text-sm"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          name="pic"
                          id="pic"
                          multiple
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="mb-2 mr-3 font-semibold text-lg text-gray-900 w-28 "
                        htmlFor=""
                      >
                        Price (PKR)
                      </label>
                      <div>
                        <input
                          className="border py-2 px-3 text-grey-800 w-3/4"
                          type="number"
                          min={0}
                          placeholder="90000"
                          required
                          // value={myProd.prodPrice}
                          disabled={disable}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mb-4 font-semibold">
                    <label>Comments</label>
                    <textarea
                      className="px-3 py-2 text-grey-800 border-2"
                      rows="4"
                      cols="50"
                      placeholder="Comments..."
                      disabled={disable}
                    />
                  </div>
                </div>

                {/* <button
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-500 hover:bg-orange-400 py-2 px-4 text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-orange-800 focus:ring-offset-2"
              disabled={disable}
            >
              Update
            </button> */}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdComparison;
