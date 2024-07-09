export const formatDate = (originalDateString) => {
  // Parse the original date string into a Date object
  const date = new Date(originalDateString);

  // Define month names array
  const monthNames = [
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

  // Extract year, month, and day components from the Date object
  const year = date.getFullYear();
  // Get month name from array
  const monthName = monthNames[date.getMonth()];
  const day = date.getDate();

  // Construct the formatted date string in "Month day year" format
  const formattedDate = `${day} ${monthName} ${year}`;

  return formattedDate;
};

import {
  format,
  differenceInMinutes,
  differenceInSeconds,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";

export const dateFormater = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffSeconds = differenceInSeconds(now, date);
  const diffMinutes = differenceInMinutes(now, date);
  const diffHours = differenceInHours(now, date);
  const diffDays = differenceInDays(now, date);
  const diffWeeks = differenceInWeeks(now, date);
  const diffMonths = differenceInMonths(now, date);
  if (diffSeconds < 60) {
    return "Just now";
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  } else if (diffMonths < 12) {
    return format(date, "d MMMM yyyy");
  } else {
    return format(date, "d MMMM yyyy");
  }
};
const date = new Date("2024-07-27T18:15:00.000Z");
// console.log(formatDate(date.toISOString()));

export default formatDate;
