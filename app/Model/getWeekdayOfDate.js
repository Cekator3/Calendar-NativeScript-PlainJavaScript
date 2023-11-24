/**
 * @fileOverview A subsystem for determining the day of the week by date.
 */

/**
 * Returns the weekday index (1-7) of a given date.
 * @param {number} year - The year of the date.
 * @param {number} month - The month of the date (0-11).
 * @param {number} day - The day of the date.
 * @returns {number} - The weekday index (1-7) of the date.
 */
export function getWeekdayOfDate(year, month, day)
{
    let result = new Date(year, month, day).getDay();
    if (result === 0)
        return 7;
    return result;
}
