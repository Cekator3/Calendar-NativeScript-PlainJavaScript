import {isMonthExists} from "~/Model/isMonthExists";
import {MonthNotExistException} from "~/Model/Exceptions";

/**
 * Returns weekday number of first day in month.
 * @param {number} year
 * @param {number} month
 * @throws {MonthNotExistException}
 * @return {number}
 */
export function getWeekdayOfFirstDayOfMonth(year, month)
{
    if (!isMonthExists(month))
        throw new MonthNotExistException(month);
    return new Date(year, month - 1, 1).getDay();
}

/**
 * Returns weekday number of first day in month.
 * @param {number} year
 * @return {number}
 */
export function getWeekdayOfFirstDayOfYear(year)
{
    return new Date(year, 0, 1).getDay();
}
