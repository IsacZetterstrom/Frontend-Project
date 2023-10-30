/**
 * @author Isac Zetterström
 * @description formats a datestring to swedish format with year as "Fredag 24 januari 2020"
 */

function getDateWithDay(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  //   const newDate = date.split(/[- :]/);

  return new Date(date).toLocaleDateString("sv-SE", options);
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
  const startTimeString = `${formatTimePart(
    startTime.getHours()
  )}:${formatTimePart(startTime.getMinutes())}`;
  const endTimeString = `${formatTimePart(endTime.getHours())}:${formatTimePart(
    endTime.getMinutes()
  )}`;

  return `${startTimeString} - ${endTimeString}`;
}

const dateUtils = {
  getDateWithDay,
  getMovieEndTime,
};

export default dateUtils;
