import moment from 'moment';

export function isValidDate(stringDate) {
  const date = new Date(stringDate);
  const checkDate = date instanceof Date && !isNaN(date.valueOf());
  return checkDate;
}
