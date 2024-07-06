import React from "react";

export default function Contact() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center">
      <div className="flex flex-col px-9 py-12 text-sm leading-5 text-black bg-white rounded shadow-sm max-w-[340px]">
        <div className="flex gap-4 text-base font-medium text-black">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c3adeddc5c9e4686049185eec05edf726c5ccbe1f3b16611c2da9a310ca5061?"
            className="shrink-0 w-10 aspect-square fill-red-500"
          />
          <div className="my-auto">Call To Us</div>
        </div>
        <div className="mt-6">We are available 24/7, 7 days a week.</div>
        <div className="mt-4">Phone: +8801611112222</div>
        <div className="shrink-0 mt-8 h-px bg-black border border-black border-solid" />
        <div className="flex gap-4 mt-8 text-base font-medium text-black">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/78ce634fd57696e4af7a0dd0217c81b3d24659ea00c5b91dd9cc701749c73926?"
            className="shrink-0 w-10 aspect-square fill-red-500"
          />
          <div className="my-auto">Write To US</div>
        </div>
        <div className="mt-6 leading-5">
          Fill out our form and we will contact you within 24 hours.
        </div>
        <div className="self-start mt-4">Emails: customer@exclusive.com</div>
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
