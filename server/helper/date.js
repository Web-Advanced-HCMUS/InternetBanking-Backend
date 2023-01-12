import moment from 'moment';
import { TIME_OFFSET } from '../utils/constant.js';

export function isValidDate(stringDate) {
  const date = new Date(stringDate);
  const checkDate = date instanceof Date && !isNaN(date.valueOf());
  return checkDate;
}

export function getFirstTimeOfDay(day) {
  const date = moment(day, 'YYYY-MM-DD').set({
    hour: 0, minute: 0, second: 0, millisecond: 0
  }).add(TIME_OFFSET, 'hour');
  return new Date(date);
}

export function getLastTimeOfDay(day) {
  const date = moment(day, 'YYYY-MM-DD').set({
    hour: 23, minute: 59, second: 59, millisecond: 99
  }).add(TIME_OFFSET, 'hour');
  return new Date(date);
}
