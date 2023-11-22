import {DayOfCalendar} from "~/Model/DayOfCalendar";
import {getWeekday} from "~/Model/getWeekday";
import {WEEKDAY_MONDAY} from "~/Model/WeekdaysConstants";
import {generateDayOfCalendar} from "~/Model/CalendarContentGenerator/generateDayOfCalendar";

function getFirstDayOfWeek(weekday, day)
{
    return day - weekday + 1;
}

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
    let result = [];
    let weekday = WEEKDAY_MONDAY;
    let firstDayOfWeek = getFirstDayOfWeek(getWeekday(year, month, day), day);
    for (let i = firstDayOfWeek; i < firstDayOfWeek + 7; i++, weekday++)
        result.push(generateDayOfCalendar(year, month, weekday, i));
    return result;
}
