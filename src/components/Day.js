import React from "react";
import dayjs from "dayjs";

export default function Day({ day, idx }) {
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-700 text-white rounded-full"
      : "";
  }
  return (
    <div className="flex flex-col justify-center items-center border-[1px] border-gray-200 ">
      {idx === 0 && (
        <div className="p-3 mt-[-3rem] mb-[2rem]"> {day.format("dddd")} </div>
      )}
      <p className={`${getCurrentDayClass()} p-1 `}>{day.format("DD")}</p>
    </div>
  );
}
