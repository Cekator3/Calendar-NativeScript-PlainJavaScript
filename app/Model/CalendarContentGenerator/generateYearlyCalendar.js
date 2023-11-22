import {MONTH_DECEMBER, MONTH_JANUARY} from "~/Model/MonthsConstants";
import {generateMonthlyCalendar} from "~/Model/CalendarContentGenerator/generateMonthlyCalendar";

function getLastDayOfMonth(indexOfFirstDay, amountOfDaysInMonth)
{
    return indexOfFirstDay + amountOfDaysInMonth - 1;
}

/**
 * Generates calendar content for the year containing the specified date.
 * @param {number} year The year of the specified date.
 * @throws {DateNotExistException}
 * @returns {DayOfCalendar[]}
 */
export function generateYearlyCalendar(year)
{
    let result = [];
    for (let i = MONTH_JANUARY; i <= MONTH_DECEMBER; i++)
        result.push(generateMonthlyCalendar(false, year, i));
    return result;
}
