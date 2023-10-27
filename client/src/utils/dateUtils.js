/**
 * @author Louise Johansson
 * @description Helper functions to format date and time to swedish standards.
 */

// Function to format a date to 'dd/mm' format
export function formatDate(dateTime) {
  const date = new Date(dateTime);
  return date.toLocaleDateString("sv-SE", {
    day: "2-digit",
    month: "2-digit",
  });
}

// Function to format a time to 'hh:mm' format
export function formatTime(dateTime) {
  const date = new Date(dateTime);
  return date.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
