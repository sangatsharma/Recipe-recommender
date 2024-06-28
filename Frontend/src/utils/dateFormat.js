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
