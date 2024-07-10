"use client";
import { useState } from "react";
import { getMonth } from "../../lib/util";
import Month from "@/components/Month";
import Header from "@/components/Header";
import dayjs from "dayjs";
import { EventModal } from "@/components/Modal";
import { saveEvent } from "../../lib/util";
import Event from "@/components/Event";

/* @client */
export default function Home() {
  // State for the current date object
  const [currentDate, setCurrentDate] = useState(dayjs());

  // State for the current month matrix
  const [currentMonth, setCurrentMonth] = useState(
    getMonth(dayjs().month(), dayjs().year())
  );

  // State for the current month number
  const [monthNumber, setMonthNumber] = useState(dayjs().month());

  // States for the event modal
  const [isEventModalOpen, setEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // State for the event info modal
  const [isEventInfoModalOpen, setEventInfoModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // State for the current year
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  const handleEventModalInfoOpen = (event) => {
    setSelectedEvent(event);
    setEventInfoModalOpen(true);
  };

  const handleEventModalOpen = (isOpen, date) => {
    setSelectedDate(date);
    setEventModalOpen(isOpen);
  };

  return (
    <>
      <main className="h-screen flex flex-col">
        <Header
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          year={currentYear}
          setCurrentMonth={setCurrentMonth}
          setNumber={setMonthNumber}
          monthNumber={monthNumber}
          setCurrentYear={setCurrentYear}
        />
        <div className="flex flex-1">
          <Month
            month={currentMonth}
            handleEventModalOpen={handleEventModalOpen}
            handleEventModalInfoOpen={handleEventModalInfoOpen}
          />
          <EventModal
            isOpen={isEventModalOpen}
            onClose={() => setEventModalOpen(false)}
            onSave={saveEvent}
            date={selectedDate}
          />
          <Event
            isOpen={isEventInfoModalOpen}
            onClose={() => setEventInfoModalOpen(false)}
            event={selectedEvent}
          />
        </div>
      </main>
    </>
  );
}
