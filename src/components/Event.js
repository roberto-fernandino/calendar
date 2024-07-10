import { useState } from "react";
import { X } from "@phosphor-icons/react";
import dayjs from "dayjs";
import EditEventModal from "./EditEventModal";

export default function Event({ event, isOpen, onClose }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  function handleDelete() {
    const events = JSON.parse(localStorage.getItem("events"));
    const newEvents = events.filter((e) => e.id !== event.id);
    localStorage.setItem("events", JSON.stringify(newEvents));
    onClose();
    window.location.reload();
  }

  function handleSave(updatedEvent) {
    const events = JSON.parse(localStorage.getItem("events"));
    const newEvents = events.map((e) =>
      e.id === updatedEvent.id ? updatedEvent : e
    );
    localStorage.setItem("events", JSON.stringify(newEvents));
    window.location.reload();
  }

  if (!isOpen) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div
            style={{ backgroundColor: event.color }}
            className={`rounded-md flex flex-col items-center p-5`}
          >
            <div className="w-full flex flex-row justify-end">
              <X
                size={32}
                onClick={onClose}
                className="bg-red-300 cursor-pointer p-3 rounded-full"
              />
            </div>
            <div className="text-[rgb(0,0,0)] flex flex-col items-center select-none">
              <span>{dayjs(event.date).format("DD/MM/YYYY dddd")}</span>
              <span>Event Details</span>
            </div>
            <div className="w-full mt-4 text-black bg-[#DEDEDE] rounded-lg  p-2 ">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Event Title
                </label>
                <p>{event.title}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Event Time
                </label>
                <p>{event.time}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <p>{event.description}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Event City
                </label>
                <p>{event.city}</p>
              </div>
              <div className="mb-4">
                <button
                  className="bg-[#f78080] rounded-md p-2 text-black"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-[#4CAF50] rounded-md p-2 text-white"
                  onClick={() => setIsEditOpen(true)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <EditEventModal
        event={event}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
