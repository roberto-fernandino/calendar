import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Day({
  day,
  idx,
  handleEventModalOpen,
  handleEventModalInfoOpen,
}) {
  const [events, setEvents] = useState([]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-700 text-white rounded-full"
      : "";
  }

  function setEventColor(id, event) {
    const eventDiv = document.getElementById(id);
    eventDiv.style.backgroundColor = event.color;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEvents = localStorage.getItem("events");
      setEvents(storedEvents ? JSON.parse(storedEvents) : []);
    }
  }, []);

  useEffect(() => {
    events.forEach((event, idx) => {
      if (event && event.date === day.format("YYYY-MM-DD")) {
        const id = `${event.date}-${idx}`;
        setEventColor(id, event);
      }
    });
  }, [events, day]);

  function openEventModal(event) {}

  return (
    <div className="flex flex-col justify-start items-center border-[1px] border-gray-200 ">
      {idx === 0 && <div className="p-2"> {day.format("dddd")} </div>}

      <p
        className={`${getCurrentDayClass()} p-3 cursor-pointer hover:bg-gray-700 rounded-full`}
        onClick={() => handleEventModalOpen(true, day)}
      >
        {day.format("DD")}
      </p>
      {events &&
        events
          .filter((event) => event != null)
          .map((event, idx) => {
            if (event.date === day.format("YYYY-MM-DD")) {
              return (
                <div
                  id={`${event.date}-${idx}`}
                  key={idx}
                  className={`p-2 rounded-md bg-[${event.color}] text-sm flex flex-row items-center justify-between w-full cursor-pointer`}
                  onClick={() => handleEventModalInfoOpen(event)}
                >
                  {event.title}
                  {event.icon && (
                    <img
                      src={`${event.icon}`}
                      alt="weather icon"
                      className="w-7"
                    />
                  )}
                </div>
              );
            }
          })}
    </div>
  );
}
