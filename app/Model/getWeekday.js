import {isDateExists, isMonthExists} from "~/Model/isDateExists";
import {DateNotExistException} from "~/Model/Exceptions";

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
