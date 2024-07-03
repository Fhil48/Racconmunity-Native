import { DateTime } from 'luxon';

export const formatDateForAppwrite = (date) => {
  console.log('date', date)
  const formattedDate = DateTime.fromJSDate(date, { zone: 'utc' }).toISO({ extended: true });
  console.log(formattedDate);
  return formattedDate;
};

export const getStartAndEndOfWeek = (date) => {
  const currentDate = new Date(date);
  const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
  firstDayOfWeek.setHours(0, 0, 0, 0);
  
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
  lastDayOfWeek.setHours(23, 59, 59, 999);
  
  return { firstDayOfWeek, lastDayOfWeek };
}

export const getStartAndEndOfMonth = (date) => {
  const currentDate = new Date(date);
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  firstDayOfMonth.setHours(0, 0, 0, 0);
  
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  lastDayOfMonth.setHours(23, 59, 59, 999);
  
  return { firstDayOfMonth, lastDayOfMonth };
}
