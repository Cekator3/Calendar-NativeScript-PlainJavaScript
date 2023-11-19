/**
 * @fileoverview A subsystem for generating calendar content for a specific time unit.
 */

export class DateNotExistException extends Error {}

/**
 * Generates calendar content for the week containing the specified date.
 * @param {number} year The year of the specified date.
 * @param {number} month The month of the specified date.
 * @param {number} day The day of the specified date.
 * @throws {DateNotExistException}
 * @returns {DayOfCalendar[]}
 */
export function generateWeeklyCalendar(year, month, day)
{
    return;
}

/**
 * Generates calendar content for the month containing the specified date.
 * @param {bool} isIncludingOutOfMonthDays Value indicating whether out-of-month days should be included.
 * @param {number} year The year of the specified date.
 * @param {number} month The month of the specified date.
 * @param {number} day The day of the specified date.
 * @throws {DateNotExistException}
 * @returns {DayOfCalendar[]}
 */
export function generateMonthlyCalendar(isIncludingOutOfMonthDays, year, month, day) {}

/**
 * Generates calendar content for the year containing the specified date.
 * @param {bool} isIncludingOutOfMonthDays Value indicating whether out-of-month days should be included.
 * @param {number} year The year of the specified date.
 * @param {number} month The month of the specified date.
 * @param {number} day The day of the specified date.
 * @throws {DateNotExistException}
 * @returns {DayOfCalendar[]}
 */
export function generateYearlyCalendar(isIncludingOutOfMonthDays, year, month, day) {}
