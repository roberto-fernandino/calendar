import React, { useCallback, useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { getMonth } from "../../lib/util";
import dayjs from "dayjs";
export default function Header({
  setCurrentMonth,
  setMonthString,
  currentDate,
  setCurrentDate,
  setCurrentYear,
}) {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [clientTime, setClientTime] = useState(null);

  useEffect(() => {
    setCurrentTime(dayjs());
  }, []);

  useEffect(() => {
    setClientTime(dayjs());
    const interval = setInterval(() => {
      setClientTime((prevTime) => prevTime.add(1, "second"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateMonth = useCallback(
    (direction) => {
      setCurrentDate((prevDate) => {
        const newDate = prevDate.add(direction, "month");
        const month = getMonth(newDate.month(), newDate.year());
        setCurrentMonth(month);
        setCurrentYear(newDate.year());
        return newDate;
      });
    },
    [setCurrentMonth, setMonthString]
  );

  return (
    <>
      <main className="flex justify-center w-screen">
        <div className="flex flex-row justify-between items-center w-screen">
          <CaretLeft
            size={32}
            onClick={() => updateMonth(-1)}
            className="cursor-pointer"
          />
          <div className="flex flex-col justify-center items-center">
            <p className="select-none text-2xl font-bold p-3 text-center">
              Calendar <br />
              {currentDate.format("MMMM YYYY")}
            </p>
            {clientTime && (
              <p className="select-none text-sm text-white font-bold text-[1.5rem] mb-2 mt-[-3px]">
                {clientTime.format("MM/DD/YYYY HH:mm:ss")}
              </p>
            )}
          </div>
          <CaretRight
            size={32}
            onClick={() => updateMonth(1)}
            className="cursor-pointer"
          />
        </div>
        <p className="text-white"></p>
      </main>
    </>
  );
}
