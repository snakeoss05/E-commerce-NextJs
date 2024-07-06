// Countdown.jsx
"use client";
import React, { useState, useEffect, useCallback } from "react";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTimeLeft = useCallback(() => {
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
  }, [targetDate]);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="flex flex-col lg:flex-row items-center py-4  rounded-lg gap-4">
      <div className="flex space-x-4 text-center">
        {Object.keys(timeLeft).length === 0 ? (
          <span className="text-xl text-red-500">Sale Ended!</span>
        ) : (
          Object.keys(timeLeft).map((interval) => (
            <div
              key={interval}
              className="flex flex-col items-center justify-center bg-gray-100 rounded-full p-2 text-center text-gray-900 w-16 h-16  sm:h-20 sm:w-20">
              <span className="font-bold text-sm lg:text-lg">
                {timeLeft[interval]}
              </span>
              <span className="text-sm capitalize font-medium">{interval}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Countdown;
