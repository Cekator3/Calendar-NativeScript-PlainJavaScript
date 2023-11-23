import {DayOfCalendar} from "~/Model/CalendarContentGenerator/CalendarDay";
import {getWeekday} from "~/Model/getWeekday";
import {WEEKDAY_MONDAY} from "~/Model/Constants/WeekdaysConstants";
import {generateDayOfCalendar} from "~/Model/CalendarContentGenerator/generateDayOfCalendar";

function getFirstDayOfWeek(weekday, day)
{
    return day - weekday + 1;
}

/**
 * Generates calendar content for the week containing the specified date.
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @throws {DateNotExistException}
 * @returns {CalendarDay[]}
 */
export function generateWeeklyCalendar(year, month, day)
{
    let result = [];
    let firstDayOfWeek = getFirstDayOfWeek(getWeekday(year, month, day), day);
    let lastDayOfWeek = firstDayOfWeek + 6;
    for (let i = firstDayOfWeek; i <= lastDayOfWeek; i++)
        result.push(generateDayOfCalendar(year, month, i));
    return result;
}
