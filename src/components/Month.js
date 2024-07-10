import React from "react";
import Day from "./Day";
export default function Month({
  month,
  handleEventModalInfoOpen,
  handleEventModalOpen,
}) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, idx) => (
        <React.Fragment key={idx}>
          {row.map((day, idxx) => (
            <Day
              day={day}
              key={idxx}
              idx={idx}
              handleEventModalOpen={handleEventModalOpen}
              handleEventModalInfoOpen={handleEventModalInfoOpen}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
