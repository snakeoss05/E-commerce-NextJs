import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          About Us
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Welcome to TechSphere, your ultimate destination for cutting-edge
          technology and innovative gadgets. At TechSphere, we are passionate
          about bringing you the latest and greatest in high-tech products, from
          state-of-the-art electronics to the most advanced smart devices.
          Whether you're a tech enthusiast, a professional, or just someone
          looking for the best in technology, we've got something for you.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:gap-x-8">
        <div className="flex flex-col items-center text-center">
          <svg
            className="w-16 h-16 text-blue-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 3.54 2.61 6.43 6 6.92V22l4-4h1c3.87 0 7-3.13 7-7s-3.13-7-7-7zm0 10c-1.66 0-3-1.34-3-3S10.34 6 12 6s3 1.34 3 3-1.34 3-3 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-500">
            Our mission is to provide our customers with top-quality products
            that enhance their lives and empower them to achieve more. We strive
            to offer a wide range of high-tech products, exceptional customer
            service, and a seamless shopping experience. At TechSphere,
            innovation is at the heart of everything we do.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <svg
            className="w-16 h-16 text-blue-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-10c-1.1 0-2 .9-2 2s.9 2 2 2c1.1 0 2-.9 2-2s-.9-2-2-2zm-3.19 6c.39-.39 1.02-.39 1.41 0l1.59 1.59 1.59-1.59c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-2.29 2.29c-.39.39-1.02.39-1.41 0l-2.29-2.29c-.39-.39-.39-1.02 0-1.41z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">
            Why Choose Us
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            We believe in the power of technology to transform lives. Our team
            is dedicated to sourcing only the best products from leading brands,
            ensuring that you receive the highest quality and most reliable
            technology. With a user-friendly website, secure payment options,
            and fast shipping, shopping with TechSphere is both easy and
            enjoyable.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <svg
            className="w-16 h-16 text-blue-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M12 4.5c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zM4.5 12C4.5 7.86 7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5S4.5 16.14 4.5 12zm10.86-5.24c.37.4.34 1.04-.06 1.41l-4.68 4.29c-.31.28-.73.43-1.16.43-.4 0-.79-.15-1.08-.44l-2.32-2.32c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0l1.74 1.74 4.29-3.94c.37-.37 1.02-.35 1.41.05z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">
            Our Commitment
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            At TechSphere, we are committed to sustainability and ethical
            business practices. We are constantly exploring ways to reduce our
            environmental impact and support communities. We value your trust
            and strive to exceed your expectations in every interaction.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <svg
            className="w-16 h-16 text-blue-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M2 8v13c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1h-3.91c-.34-1.19-1.43-2-2.64-2H9.55C8.34 5 7.25 5.81 6.91 7H3c-.55 0-1 .45-1 1zm11-3h3.08c.49 0 .92.3 1.08.76l.7 2.24H11V5zM9 5v3H5.14l.7-2.24C5.99 5.3 6.42 5 6.91 5H9zm4 11c-2.48 0-4.5-2.02-4.5-4.5S10.52 7 13 7s4.5 2.02 4.5 4.5S15.48 16 13 16z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            We love hearing from our customers! If you have any questions,
            feedback, or just want to say hello, feel free to reach out to us.
            Our customer support team is always here to help. Thank you for
            choosing TechSphere as your trusted source for high-tech products!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
