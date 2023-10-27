export function getMovieEndTime(startTimeISO, duration) {
  const startTime = new Date(startTimeISO);
  const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

  const startHours = startTime.getHours();
  const startMinutes = startTime.getMinutes();
  const endHours = endTime.getHours();
  const endMinutes = endTime.getMinutes();

  // Format the hours and minutes as "HH:mm" and create the time range string
  const startTimeString = `${startHours
    .toString()
    .padStart(2, "0")}:${startMinutes.toString().padStart(2, "0")}`;
  const endTimeString = `${endHours.toString().padStart(2, "0")}:${endMinutes
    .toString()
    .padStart(2, "0")}`;

  return `${startTimeString} - ${endTimeString}`;
}

export function formatDateToSwedish(dateISO) {
  const options = { weekday: "long", day: "numeric", month: "long" };
  const date = new Date(dateISO);

  const swedishDate = date.toLocaleDateString("sv-SE", options);

  return swedishDate;
}
