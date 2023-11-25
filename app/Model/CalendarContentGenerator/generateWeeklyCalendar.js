import {getWeekdayOfDate} from "~/Model/getWeekdayOfDate";
import {CalendarDay} from "~/Model/CalendarContentGenerator/CalendarDay";

function getFirstDayOfWeek(weekday, day)
{
    return day - weekday + 1;
}

/**
 * Generates calendar content for the week containing the specified date.
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {CalendarDay[]}
 */
export function generateWeeklyCalendar(year, month, day)
{
    let result = [];
    let firstDayOfWeek = getFirstDayOfWeek(getWeekdayOfDate(year, month, day), day);
    let lastDayOfWeek = firstDayOfWeek + 6;
    for (let i = firstDayOfWeek; i <= lastDayOfWeek; i++)
        result.push(new CalendarDay(year, month, i));
    return result;
}
