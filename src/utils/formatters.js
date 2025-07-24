import dayjs from "dayjs";

// Format currency values consistently across the app
export const formatCurrency = (value) => {
  const numValue = Number(value);
  return !isNaN(numValue) ? `$${numValue.toFixed(2)}` : "";
};

// Format dates consistently across the app
export const formatDate = (date) => {
  return date ? dayjs(date).format("MMM DD, YYYY") : "";
};

// Format month names consistently
export const formatMonthName = (month) => {
  return month ? dayjs().month(month).format("MMMM") : "";
};
