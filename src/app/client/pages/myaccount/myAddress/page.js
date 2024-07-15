"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { updateUser } from "@/lib/features/auth/authAction";

export default function Addresses() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [show, setShow] = useState(false);
  const [myAddress, setMyAddresses] = useState({});
  const [address, setAddress] = useState({
    city: "",
    state: "",
    street: "",
    phone: "",
  });

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-backend-dvaf.onrender.com /api/addresses/${user._id}`
        );

        if (response.status == 200) setMyAddresses(response.data.data.address);
      } catch (err) {
        toast.error("Something went wrong");
      }
    };
    getAddress();
  }, [myAddress, user._id]);
  const createAddress = async () => {
    if (!address.city || !address.state || !address.street || !address.phone) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(
        `https://e-commerce-backend-dvaf.onrender.com /api/addresses/${user._id}`,
        address
      );
      if (response.status === 201) {
        setMyAddresses(address);
        dispatch(updateUser({ address: address }));
        toast.success("Address created successfully");
        setShow(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteAddress = async () => {
    try {
      const response = await axios.delete(
        `https://e-commerce-backend-dvaf.onrender.com /api/addresses/${user._id}`
      );
      if (response.status === 200) {
        toast.success("Address deleted successfully");
        setMyAddresses({});
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  function HandleChange(event) {
    const { name, value } = event.target;

    setAddress((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }
  return (
    <div className="bg-gray-100 h-full w-full p-4 my-4 sm:p-16  flex flex-col  gap-4  overflow-y-auto ">
      <p className="text-3xl font-bold text-gray-700 text-center py-4 ">
        My Address
      </p>

      <div className="flex flex-col lg:flex-row p-4 gap-4 w-full  h-84  ">
        {myAddress && (
          <div className="p-4 flex flex-col border border-gray-200 w-full lg:w-1/4 h-fit bg-white relative shadow">
            <span className="text-[12px] text-gray-400 font-semibold bg-gray-100 px-4 py-2 uppercase w-fit absolute top-0 left-0">
              Home
            </span>
            <div className="gap-4 flex flex-row  ms-auto">
              <span
                className="text-red-500 hover:text-black hover:bg-red-400 border border-red-400 px-4 py-2 rounded text-sm cursor-pointer "
                onClick={() => deleteAddress()}>
                Delete
              </span>
            </div>
            <div className="flex flex-col py-4 gap-2 capitalize mt-4">
              <p className="text-xl font-bold text-gray-500 border-b-2 pb-2 w-fit">
                Home
              </p>
              <p className="text-md font-semibold text-gray-500 mb-4">
                {user?.name} {user?.lastname}
              </p>
              <p className="text-base font-semibold text-gray-400 w-full lg:w-3/4">
                {myAddress?.city},{myAddress?.state}
              </p>
              <p className="text-sm font-normal text-gray-400 w-full lg:w-3/4">
                {myAddress?.street}
              </p>
            </div>
          </div>
        )}

        {show && (
          <div className="p-4 flex flex-col border border-gray-200 bg-white relative shadow w-full lg:w-fit">
            <span
              className=" bg-gray-200 text-gray-500 w-8 text-center p-1 text-base h-8 rounded-full cursor-pointer hover:bg-gray-100 absolute top-3 right-4"
              onClick={() => setShow(false)}>
              -
            </span>
            <p className="text-xl font-bold text-gray-500">Add new address</p>
            <div className="flex flex-col py-4 mt-2 gap-2 capitalize">
              <div className="my-2">
                <label
                  htmlFor="UserCity"
                  className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                  <span className="text-xs font-medium text-gray-700">
                    City
                  </span>

                  <input
                    type="UserCity"
                    id="UserCity"
                    name="city"
                    value={address.city}
                    onChange={HandleChange}
                    placeholder="Tunis ..."
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>
              </div>
              <div className="my-2">
                <label
                  htmlFor="UserState"
                  className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                  <span className="text-xs font-medium text-gray-700">
                    State
                  </span>

                  <input
                    type="UserState"
                    id="UserState"
                    name="state"
                    value={address.state}
                    onChange={HandleChange}
                    placeholder="Bardo ..."
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>
              </div>

              <div className="my-2">
                <label
                  htmlFor="UserAddress"
                  className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                  <span className="text-xs font-medium text-gray-700">
                    Address
                  </span>

                  <input
                    type="Address"
                    id="UserAddress"
                    name="street"
                    value={address.street}
                    onChange={HandleChange}
                    placeholder="Street name, number..."
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>
              </div>
              <div className="my-2">
                <label
                  htmlFor="UserPhone Number"
                  className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                  <span className="text-xs font-medium text-gray-700">
                    Phone Number
                  </span>

                  <input
                    type="Phone Number"
                    id="UserPhone Number"
                    name="phone"
                    value={address.phone}
                    onChange={HandleChange}
                    placeholder="24 369 845"
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>
              </div>

              <div className="flex flex-row">
                <button
                  role="button"
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg btn-sm ms-auto mt-2 text-white"
                  onClick={createAddress}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-lg  text-white mx-auto "
        onClick={() => setShow(true)}>
        Add New Address
      </button>
    </div>
  );
}
