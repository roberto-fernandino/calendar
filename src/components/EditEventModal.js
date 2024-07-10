import { useState } from "react";
import { X } from "@phosphor-icons/react";
import dayjs from "dayjs";

export default function EditEventModal({ event, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState(event.title);
  const [time, setTime] = useState(event.time);
  const [description, setDescription] = useState(event.description);
  const [city, setCity] = useState(event.city);

  function handleSave() {
    const updatedEvent = { ...event, title, time, description, city };
    onSave(updatedEvent);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white rounded-md flex flex-col items-center p-5">
        <div className="w-full flex flex-row justify-end">
          <X
            size={32}
            onClick={onClose}
            className="bg-red-300 cursor-pointer p-3 rounded-full"
          />
        </div>
        <div className="text-[rgb(0,0,0)] flex flex-col items-center select-none">
          <span>{dayjs(event.date).format("DD/MM/YYYY dddd")}</span>
          <span>Edit Event</span>
        </div>
        <div className="w-full mt-4 text-black  rounded-lg p-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Event Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-md"
              maxLength={30}
            />
            <div className="text-sm text-gray-500 mb-2">
              {`Characters remaining: ${30 - description.length}`}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Event City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <button
              className="bg-[#4CAF50] rounded-md p-2 text-white"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
