import React from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { getMonth } from "../../lib/util";

export default function Header({ month, func, monthNumber, setNumber }) {
  return (
    <>
      <main className="flex justify-center w-screen">
        <div className="flex flex-row justify-between w-screen">
          <CaretLeft
            size={32}
            onClick={() => {
              setNumber(monthNumber - 1);
              func(getMonth(monthNumber));
            }}
            className="cursor-pointer"
          />
          <p>Calendar {monthNumber}</p>
          <CaretRight
            size={32}
            onClick={() => {
              setNumber(monthNumber + 1);
              func(getMonth(monthNumber));
            }}
            className="cursor-pointer"
          />
        </div>
        <p className="text-white"></p>
      </main>
    </>
  );
}
