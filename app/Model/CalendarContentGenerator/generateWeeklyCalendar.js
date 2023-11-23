import {DayOfCalendar} from "~/Model/DayOfCalendar";
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
 * @returns {DayOfCalendar[]}
 */
export function generateWeeklyCalendar(year, month, day)
{
    let result = [];
    let weekday = WEEKDAY_MONDAY;
    let firstDayOfWeek = getFirstDayOfWeek(getWeekday(year, month, day), day);
    let lastDayOfWeek = firstDayOfWeek + 6;
    for (let i = firstDayOfWeek; i <= lastDayOfWeek; i++, weekday++)
        result.push(generateDayOfCalendar(year, month, weekday, i));
    return result;
}
