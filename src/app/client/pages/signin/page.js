"use client";
import React, { useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { login } from "@/lib/features/auth/authAction";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logform, setlogform] = useState({
    email: "",
    password: "",
  });
  async function loginform(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", logform);
      const { token, user } = response.data;
      dispatch(login({ token, user }));
      toast.success("login succcesful");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  function HandleChange(event) {
    const { name, value } = event.target;

    setlogform((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Get started today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            sunt dolores deleniti inventore quaerat mollitia?
          </p>

          <form
            action="#"
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  name="email"
                  value={logform.email}
                  onChange={HandleChange}
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
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  name="password"
                  value={logform.password}
                  onChange={HandleChange}
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
              onClick={loginform}
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
              Sign in
            </button>

            <p className="text-center text-sm text-gray-500 ">
              No account?
              <Link className="underline ms-2" href="/client/pages/signup">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
