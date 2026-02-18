import { Time } from '../backend';

// Fixed start date: February 20, 2026
export const START_DATE = new Date(2026, 1, 20); // Month is 0-indexed, so 1 = February

/**
 * Convert JavaScript Date to backend Time format (nanoseconds since epoch)
 */
export function dateToTime(date: Date): Time {
  return BigInt(date.getTime()) * BigInt(1_000_000);
}

/**
 * Convert backend Time to JavaScript Date
 */
export function timeToDate(time: Time): Date {
  return new Date(Number(time / BigInt(1_000_000)));
}

/**
 * Format date in Spanish locale
 */
export function formatDate(time: Time): string {
  const date = timeToDate(time);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Calculate day number within the 90-day period from the fixed start date
 */
export function calculateDayNumber(time: Time): number {
  const date = timeToDate(time);
  const diffTime = date.getTime() - START_DATE.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Clamp between 1 and 90
  return Math.max(1, Math.min(90, diffDays + 1));
}

/**
 * Get actual date from day number (1-90)
 */
export function getDateFromDayNumber(dayNumber: number): Date {
  const date = new Date(START_DATE);
  date.setDate(date.getDate() + dayNumber - 1);
  return date;
}

/**
 * Format a date range in Spanish
 */
export function formatDateRange(startDay: number, endDay: number): string {
  const startDate = getDateFromDayNumber(startDay);
  const endDate = getDateFromDayNumber(endDay);
  
  const startStr = startDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  });
  
  const endStr = endDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  
  return `${startStr} - ${endStr}`;
}

/**
 * Get phase start date
 */
export function getPhaseStartDate(startDay: number): Date {
  return getDateFromDayNumber(startDay);
}

/**
 * Get phase end date
 */
export function getPhaseEndDate(endDay: number): Date {
  return getDateFromDayNumber(endDay);
}
