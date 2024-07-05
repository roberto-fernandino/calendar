import React, { useCallback } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { getMonth, getMonthString } from "../../lib/util";

export default function Header({ month, func, setNumber, setMonthString }) {

  const updateMonth = useCallback((direction) => {
    setNumber((prevNumber) => {
      const newNumber = prevNumber + direction;
      func(getMonth(newNumber));
      setMonthString(getMonthString(newNumber));
      console.log(newNumber);
      return newNumber;
    });
  }, [func, setNumber, setMonthString]);

  return (
    <>
      <main className="flex justify-center w-screen">
        <div className="flex flex-row justify-between w-screen">
          <CaretLeft
            size={32}
            onClick={() => updateMonth(-1)}
            className="cursor-pointer"
          />
          <p>Calendar {month}</p>
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
