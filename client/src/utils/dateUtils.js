/**
 * @author Isac Zetterström
 * @description formats a datestring to swedish format with year as "Fredag 24 januari 2020"
 */

export default function getDateWithDay(date) {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = new Date(date).toLocaleDateString("sv-SE", options);

  // Capitalize the first letter of the formatted date
  const capitalizedFormattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return capitalizedFormattedDate;
}

/**
 * @author Louise Johansson
 * @description Helper functions to format date and time to swedish standards.
 */

// Calculate the end time for a movie with start time and duration
export function getMovieEndTime(startTimeISO, duration) {
  const startTime = new Date(startTimeISO);
  const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

  const formatTimePart = (time) => time.toString().padStart(2, "0");
  const startTimeString = `${formatTimePart(startTime.getHours())}:${formatTimePart(startTime.getMinutes())}`;
  const endTimeString = `${formatTimePart(endTime.getHours())}:${formatTimePart(endTime.getMinutes())}`;

  return `${startTimeString} - ${endTimeString}`;
}

// Format a date or time based on the formatType ("date" or "time") e.g. "15/04"
export function formatDateOrTime(dateTime, formatType) {
  const date = new Date(dateTime);
  const options = {
    date: { year: "numeric", day: "2-digit", month: "2-digit" },
    time: { hour: "2-digit", minute: "2-digit" },
  };
  return date.toLocaleString("sv-SE", options[formatType]);
}

// Format a date string to exclude time and time zone information e.g. "2016-10-19"
export function formatDateString(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
}

// Format a date string to a Swedish date format. e.g. "Fredag 24 oktober" or "24 okt"
export function formatDateStringToSwedish(dateString, includeWeekday = true) {
  const date = new Date(dateString);
  const options = includeWeekday
    ? { weekday: "long", day: "numeric", month: "long" }
    : { day: "numeric", month: "short" };

  return date.toLocaleDateString("sv-SE", options);
}
