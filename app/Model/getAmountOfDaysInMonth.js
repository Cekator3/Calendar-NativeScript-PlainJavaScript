/**
 * @fileOverview A subsystem for determining the number of days in a month.
 */

/**
 * Returns amount of days in month.
 * @param {number} year
 * @param {number} month (0 - 11)
 * @return {number | NaN} Returns NaN if month is invalid.
 */
export function getAmountOfDaysInMonth(year, month)
{
    return new Date(year, month + 1, 0).getDate();
}
