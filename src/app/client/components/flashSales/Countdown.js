// Countdown.jsx
"use client";
import React, { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col lg:flex-row gap-x-8 items-center bg-white">
      <h2 className="text-3xl font-bold mb-4">Flash Sale Ends In</h2>
      <div className="flex space-x-4 text-center">
        {Object.keys(timeLeft).length === 0 ? (
          <span className="text-xl text-red-500">Sale Ended!</span>
        ) : (
          Object.keys(timeLeft).map((interval, index) => (
            <div key={interval} className="flex flex-col items-center">
              <span className="text-4xl font-semibold">
                {timeLeft[interval]}{" "}
                {index !== Object.keys(timeLeft).length - 1 && (
                  <span className="text-red-500">:</span>
                )}
              </span>
              <span className="text-sm text-gray-600">{interval}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Countdown;
