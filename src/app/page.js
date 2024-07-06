"use client"; 
import { useState } from "react";
import { getMonth, getMonthString } from "../../lib/util";
import Month from "@/components/Month";
import Header from "@/components/Header";
import dayjs from "dayjs";
import { EventModal } from "@/components/Modal";
/* @client */
export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [monthString, setMonthString] = useState(getMonthString());
  const [monthNumber, setMonthNumber] = useState(dayjs().month());
  const [isEventModalOpen, setEventModalOpen] = useState(false);

  return (
    <>
      <main className="h-screen flex flex-col">
        <Header
          month={monthString}
          func={setCurrentMonth}
          setNumber={setMonthNumber}
          setMonthString={setMonthString}
          monthNumber={monthNumber}
        />
        <div className="flex flex-1">
          <Month month={currentMonth} setEventModalOpen={setEventModalOpen}/>
          <EventModal isOpen={isEventModalOpen} onClose={() => setEventModalOpen(false)}/>
        </div>
      </main>
    </>
  );
} 
