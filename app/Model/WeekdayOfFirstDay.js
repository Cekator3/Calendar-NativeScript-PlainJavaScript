import {isDateExists, isMonthExists} from "~/Model/isDateExists";
import {DateNotExistException} from "~/Model/Exceptions";
import {getAmountOfDaysInMonth} from "~/Model/getAmountOfDaysInMonth";

/**
 * Returns the weekday index (1-7) of a given date.
 *
 * @param {number} year - The year of the date.
 * @param {number} month - The month of the date (0-11).
 * @param {number} day - The day of the date.
 * @returns {number} - The weekday index (1-7) of the date.
 * @throws {DateNotExistException} - If the date does not exist.
 */
export function getWeekday(year, month, day)
{
    if (!isDateExists(year, month, day))
        throw new DateNotExistException(year, month, day);
    let result = new Date(year, month, day).getDay();
    if (result === 0)
        return 7;
    return result;
}

/**
 * Returns the weekday number of the first day in a given month and year.
 * @param {number} year - The year of the month.
 * @param {number} month - The month (0-11) for which to get the weekday.
 * @throws {DateNotExistException} - If the month does not exist.
 * @returns {number} - The weekday index (1-7) of the date.
 */
export function getWeekdayOfFirstDayOfMonth(year, month)
{
    if (!isMonthExists(month))
        throw new DateNotExistException(year, month);
    let result = new Date(year, month - 1, 1).getDay();
    if (result === 0)
        return 7;
    return result;
}

/**
 * Returns the weekday of the first day of the year.
 * @param {number} year - The year for which to get the weekday.
 * @returns {number} - The weekday of the first day of the year (1-7).
 */
export function getWeekdayOfFirstDayOfYear(year)
{
    let result = new Date(year, 0, 1).getDay();
    if (result === 0)
        return 7;
    return result;
}
