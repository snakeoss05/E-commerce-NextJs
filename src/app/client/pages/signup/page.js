"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "@/lib/features/auth/authAction";
import { useAppDispatch } from "@/lib/hooks";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  async function RegisterForm(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://e-commerce-backend-dvaf.onrender.com /api/users",
        register
      );
      const response2 = await axios.post(
        "https://e-commerce-backend-dvaf.onrender.com /api/auth/login",
        register
      );
      const { token, user } = response2.data;
      dispatch(login({ token, user }));
      toast.success("account created succesful");
      router.push("/client/pages/myaccount");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  function HandleChange(event) {
    const { name, value } = event.target;

    setRegister((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-black sm:text-3xl">
            Welcome to Electro Stroe
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Create your account. It's quick and easy.
          </p>

          <form
            action="#"
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

            <div>
              <label htmlFor="FullName" className="sr-only">
                FullName
              </label>

              <div className="relative">
                <input
                  type="FullName"
                  name="name"
                  id="FullName"
                  onChange={HandleChange}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Your Full Name"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 text-gray-400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4 21C4 17.4735 6.60771 14.5561 10 14.0709M19.8726 15.2038C19.8044 15.2079 19.7357 15.21 19.6667 15.21C18.6422 15.21 17.7077 14.7524 17 14C16.2923 14.7524 15.3578 15.2099 14.3333 15.2099C14.2643 15.2099 14.1956 15.2078 14.1274 15.2037C14.0442 15.5853 14 15.9855 14 16.3979C14 18.6121 15.2748 20.4725 17 21C18.7252 20.4725 20 18.6121 20 16.3979C20 15.9855 19.9558 15.5853 19.8726 15.2038ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>{" "}
                    </g>
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={HandleChange}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Your email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={HandleChange}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Your password"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              onClick={RegisterForm}
              className="block w-full rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white">
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-500">
              u Have an account?
              <Link className="underline ms-2" href="/client/pages/signin">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
