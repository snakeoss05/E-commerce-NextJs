"use client";
import React, { useState, useEffect, useCallback } from "react";

export default function Countdown({ targetDate }) {
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
    <div>
      {timeLeft.days !== undefined ? (
        <>
          <span>{timeLeft.days}d</span> <span>{timeLeft.hours}h</span>{" "}
          <span>{timeLeft.minutes}m</span> <span>{timeLeft.seconds}s</span>
        </>
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  );
}
