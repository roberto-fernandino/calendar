"use client"; // This is a client component 👈🏽
import { useState } from "react";
import { getMonth } from "../../lib/util";
import Month from "@/components/Month";
import Header from "@/components/Header";
import dayjs from "dayjs";

/* @client */
export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [monthNumber, setMonthNumber] = useState(dayjs().month() + 1);

  return (
    <>
      <main className="h-screen flex flex-col">
        <Header
          month={currentMonth}
          func={setCurrentMonth}
          setNumber={setMonthNumber}
          monthNumber={monthNumber}
        />
        <div className="flex flex-1">
          <Month month={currentMonth} />
        </div>
      </main>
    </>
  );
}
