import {MONTH_DECEMBER, MONTH_JANUARY} from "~/Model/Constants/MonthsConstants";
import {generateMonthlyCalendar} from "~/Model/CalendarContentGenerator/generateMonthlyCalendar";

/**
 * Generates calendar content for the year containing the specified date.
 * @param {number} year The year of the specified date.
 * @returns {CalendarDay[]}
 */
export function generateYearlyCalendar(year)
{
    let result = [];
    for (let month = MONTH_JANUARY; month <= MONTH_DECEMBER; month++)
        result.push(generateMonthlyCalendar(false, year, month));
    return result;
}
