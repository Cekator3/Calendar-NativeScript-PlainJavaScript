import {getWeekday} from "~/Model/WeekdayOfFirstDay";
import {WEEKDAY_MONDAY} from "~/Model/WeekdaysConstants";
import {getAmountOfDaysInMonth} from "~/Model/getAmountOfDaysInMonth";
import {DayOfCalendar} from "~/Model/DayOfCalendar";
import {MONTH_DECEMBER} from "~/Model/MonthsConstants";

function getIndexOfLastDayOfMonth(indexOfFirstDay, amountOfDaysInMonth, isIncludingOutOfMonthDays)
{
    if (!isIncludingOutOfMonthDays)
        return indexOfFirstDay + amountOfDaysInMonth - 1;
    return indexOfFirstDay + 42 - 1;
}

/**
 * Generates calendar content for the month containing the specified date.
 * @param {bool} isIncludingOutOfMonthDays Value indicating whether out-of-month days should be included.
 * @param {number} year The year of the specified date.
 * @param {number} month The month of the specified date.
 * @param {number} day The day of the specified date.
 * @throws {DateNotExistException}
 * @returns {DayOfCalendar[]}
 */
export function generateMonthlyCalendar(isIncludingOutOfMonthDays, year, month)
{
    let result = [];
    let weekday = WEEKDAY_MONDAY;
    let amountOfDaysInMonth = getAmountOfDaysInMonth(month);
    let indexOfFirstDay = 1 - getWeekday(year, month, 1);
    let indexOfLastDay = getIndexOfLastDayOfMonth(indexOfFirstDay, amountOfDaysInMonth, isIncludingOutOfMonthDays);
    for (let i = indexOfFirstDay; i <= indexOfLastDay; i++)
    {
        result.push(generateDay(year, month, weekday, i));
        weekday = (weekday + 1) % 12;
    }
    return result;
}

