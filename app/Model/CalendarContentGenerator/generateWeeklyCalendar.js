import {getAmountOfDaysInMonth} from "~/Model/getAmountOfDaysInMonth";
import {DayOfCalendar} from "~/Model/DayOfCalendar";
import {getWeekday} from "~/Model/WeekdayOfFirstDay";
import {MONTH_DECEMBER, MONTH_JANUARY} from "~/Model/MonthsConstants";

function getAmountOfDaysInPreviousMonth(month)
{
    if (month === MONTH_JANUARY)
        return getAmountOfDaysInMonth(MONTH_DECEMBER);
    return getAmountOfDaysInMonth(month - 1);
}

function generateDayFromPreviousMonth(year, month, weekday, dayIndex)
{
    if (month === MONTH_JANUARY)
        year--;
    let amountOfDaysInPreviousMonth = getAmountOfDaysInPreviousMonth(month);
    month--;
    dayIndex += amountOfDaysInPreviousMonth;
    return new DayOfCalendar(dayIndex, month, year, weekday);
}

function generateDayFromNextMonth(year, month, weekday, dayIndex, lastDayOfCurrentMonth)
{
    if (month === MONTH_DECEMBER)
        year++;
    dayIndex = dayIndex - lastDayOfCurrentMonth;
    month++;
    return new DayOfCalendar(dayIndex, month, year, weekday);
}

function generateDay(year, month, weekday, dayIndex)
{
    if (dayIndex <= 0)
        return generateDayFromPreviousMonth(year, month, weekday, dayIndex);
    let lastDayOfMonth = getAmountOfDaysInMonth(month);
    if (dayIndex > lastDayOfMonth)
        return generateDayFromNextMonth(year, month, weekday, dayIndex, lastDayOfMonth);
    return new DayOfCalendar(dayIndex, month, year, weekday);
}

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
    let weekday = getWeekday(year, month, day);
    let firstDayOfWeek = getFirstDayOfWeek(weekday, day);
    weekday = 1;
    for (let i = firstDayOfWeek; i < firstDayOfWeek + 7; i++, weekday++)
        result.push(generateDay(year, month, weekday, i));
    return result;
}
