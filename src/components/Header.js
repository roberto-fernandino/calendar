import React, { useCallback } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { getMonth } from "../../lib/util";

export default function Header({
  setCurrentMonth,
  setMonthString,
  currentDate,
  setCurrentDate,
  setCurrentYear,
}) {
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
        <div className="flex flex-row justify-between w-screen">
          <CaretLeft
            size={32}
            onClick={() => updateMonth(-1)}
            className="cursor-pointer"
          />
          <p className="select-none">
            Calendar {currentDate.format("MMMM YYYY")}
          </p>
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
