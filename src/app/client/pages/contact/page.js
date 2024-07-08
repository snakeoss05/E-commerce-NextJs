import React from "react";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center">
      <div className="flex flex-col px-9 py-12 text-sm leading-5 text-black bg-white rounded shadow-sm max-w-[340px]">
        <div className="flex gap-4 text-base font-medium text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-6 h-6 text-red-500"
            fill="currentColor">
            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
          </svg>

          <div className="my-auto">Call To Us</div>
        </div>
        <div className="mt-6">We are available 24/7, 7 days a week.</div>
        <div className="mt-4">Phone: +27 768 325</div>
        <div className="shrink-0 mt-8 h-px bg-black border border-black border-solid" />
        <div className="flex gap-4 mt-8 text-base font-medium text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-6 h-6 text-red-500"
            fill="currentColor"
            c>
            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
          </svg>
          <div className="my-auto">Write To US</div>
        </div>
        <div className="mt-6 leading-5">
          Fill out our form and we will contact you within 24 hours.
        </div>
        <div className="self-start mt-4">Emails: support@exclusive.com</div>
        <div className="mt-4">Emails: support@exclusive.com</div>
      </div>
      <div className="flex flex-col justify-center px-8 py-10 text-base leading-6 bg-white rounded shadow-sm max-w-[900px] max-md:px-5">
        <div className="flex gap-4 leading-6 text-red-500 max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col justify-center">
            <input
              className="justify-center items-start px-4 py-3 rounded bg-neutral-100 max-md:pr-5"
              placeholder="Your Name"
            />
          </div>
          <div className="flex flex-col justify-center">
            <input
              className="justify-center items-start px-4 py-3 rounded bg-neutral-100 max-md:pr-5"
              placeholder="Your Email"
            />
          </div>
          <div className="flex flex-col justify-center">
            <input
              className="justify-center items-start px-4 py-3 rounded bg-neutral-100 max-md:pr-5"
              placeholder="Phone Number"
            />
          </div>
        </div>
        <textarea
          className="items-start px-4 pt-5 pb-36 mt-8 text-black rounded bg-neutral-100 max-md:pr-5 max-md:pb-10 max-md:max-w-full"
          placeholder="Your Message"
        />

        <button
          type="button"
          aria-roledescription="Send-Message"
          className="justify-center self-end px-12 py-4 mt-8 font-medium bg-red-500 rounded text-neutral-50 max-md:px-5 hover:bg-red-600">
          Send Massage
        </button>
      </div>
    </div>
  );
}
