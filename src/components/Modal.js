import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { createNewEvent } from "../../lib/util";

export function EventModal({ isOpen, onClose, onSave, date }) {
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("12:00");
  const [eventColor, setEventColor] = useState("#3498db");
  const [eventCityName, setEventCityName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  // Function to check if the event date is within 14 days
  const isWithinFourteenDays = (date) => {
    const now = dayjs();
    const fourteenDaysLater = now.add(14, "day");
    const isWithinFourteenDays =
      date.isAfter(now) && date.isBefore(fourteenDaysLater);
    return isWithinFourteenDays;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventDateTime = dayjs(`${date.format("YYYY-MM-DD")}T${eventTime}`);
    if (eventDateTime.format("YYYY-MM-DD") < dayjs().format("YYYY-MM-DD")) {
      alert("Event date can't be in the past");
      return;
    }
    const isWithin14Days = isWithinFourteenDays(eventDateTime);
    const newEvent = await createNewEvent(
      isWithin14Days,
      eventDateTime,
      eventTitle,
      eventDescription,
      eventColor,
      eventCityName,
      eventTime
    );
    onSave(newEvent);
    onClose();
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-[#DEDEDE] rounded-md flex flex-col items-center p-5">
        <div className="w-full flex flex-row justify-end">
          <X
            size={32}
            onClick={onClose}
            className="bg-red-300 cursor-pointer p-3 rounded-full"
          />
        </div>
        <div className="text-[rgb(0,0,0)] flex flex-col items-center select-none">
          <span>{date.format("DD/MM/YYYY dddd")}</span>
          <span>Create an event</span>
        </div>
        <form onSubmit={handleSubmit} className="w-full mt-4">
          <div className="mb-4">
            <label
              htmlFor="eventTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Event Title
            </label>
            <input
              type="text"
              id="eventTitle"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-[rgb(0,0,0)] sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="eventTime"
              className="block text-sm font-medium text-gray-700"
            >
              Event Time
            </label>
            <input
              type="time"
              id="eventTime"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-[rgb(0,0,0)] sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="eventDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="eventDescription"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-[rgb(0,0,0)] sm:text-sm"
              rows="3"
              maxLength={30}
            ></textarea>
            <div className="text-right sm:text-sm text-[rgb(0,0,0)]">
              {30 - eventDescription.length === 0 ? (
                <span style={{ color: "red" }}>Max reached</span>
              ) : (
                `${30 - eventDescription.length} characters left`
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="eventCityName"
              className="block text-sm font-medium text-gray-700"
            >
              Event City
            </label>
            <input
              type="text"
              id="eventCityName"
              value={eventCityName}
              onChange={(e) => setEventCityName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-[rgb(0,0,0)] sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="eventColor"
              className="block text-sm font-medium text-gray-700"
            >
              Event Color
            </label>
            <input
              type="color"
              id="eventColor"
              value={eventColor}
              onChange={(e) => {
                setEventColor(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 "
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
