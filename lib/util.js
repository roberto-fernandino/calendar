import dayjs from "dayjs";

export function getMonth(month, year) {
  // Create a dayjs object for the first day of the given month and year
  const firstDayOfMonth = dayjs(new Date(year, month, 1));
  const firstDayOfWeek = firstDayOfMonth.day();
  let currentMonthCount = 0 - firstDayOfWeek;

  // Create a month matrix with 5 weeks
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return firstDayOfMonth.add(currentMonthCount, "day");
    });
  });

  return daysMatrix;
}

export function getMonthString(month = dayjs().month()) {
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthArray[month];
}

export async function createNewEvent(
  isWithin14Days,
  eventDateTime,
  eventTitle,
  eventDescription,
  eventColor,
  eventCityName,
  eventTime
) {
  let newEvent = null; // Starting newEvent as null

  if (isWithin14Days) {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=996d4c74574845f1920172951240607&q=${eventCityName}&days=10&aqi=no&alerts=no`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        const weatherDay =
          data.forecast.forecastday.find(
            (day) => day.date === eventDateTime.format("YYYY-MM-DD")
          ) || data.forecast.forecastday[data.forecast.forecastday.length - 1];
        const eventIcon = weatherDay.day.condition.icon;

        newEvent = {
          title: eventTitle,
          description: eventDescription,
          color: eventColor,
          city: eventCityName,
          icon: eventIcon,
          date: eventDateTime.format("YYYY-MM-DD"),
          time: eventTime,
        };
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/future.json?key=996d4c74574845f1920172951240607&q=${eventCityName}&dt=${eventDateTime.format(
          "YYYY-MM-DD"
        )}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        const eventIcon = data.forecast.forecastday[0].day.condition.icon;

        newEvent = {
          title: eventTitle,
          description: eventDescription,
          color: eventColor,
          city: eventCityName,
          icon: eventIcon,
          date: eventDateTime.format("YYYY-MM-DD"),
          time: eventTime,
        };
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (newEvent === null) {
    newEvent = {
      title: eventTitle,
      description: eventDescription,
      color: eventColor,
      city: eventCityName,
      icon: "",
      date: eventDateTime.format("YYYY-MM-DD"),
      time: eventTime,
    };
  }

  return newEvent;
}

export function saveEvent(event) {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  events.push(event);
  localStorage.setItem("events", JSON.stringify(events));
}
