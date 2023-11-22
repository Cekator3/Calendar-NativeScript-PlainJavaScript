import {getWeekday} from "~/Model/getWeekday";
import {WEEKDAY_MONDAY, WEEKDAY_SUNDAY} from "~/Model/WeekdaysConstants";
import {getAmountOfDaysInMonth} from "~/Model/getAmountOfDaysInMonth";
import {DayOfCalendar} from "~/Model/DayOfCalendar";
import {generateDayOfCalendar} from "~/Model/CalendarContentGenerator/generateDayOfCalendar";

function getIndexOfLastDayOfMonth(month, isIncludingOutOfMonthDays, indexOfFirstDay)
{
    if (!isIncludingOutOfMonthDays)
        return indexOfFirstDay + getAmountOfDaysInMonth(month) - 1;
    return indexOfFirstDay + 42 - 1;
}

function getIndexOfFirstDayOfMonth(year, month, isIncludingOutOfMonthDays)
{
    if (!isIncludingOutOfMonthDays)
        return 1;
    return 2 - getWeekday(year, month, 1);
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
    let indexOfFirstDay = getIndexOfFirstDayOfMonth(year, month, isIncludingOutOfMonthDays);
    let indexOfLastDay = getIndexOfLastDayOfMonth(month,
                                                  isIncludingOutOfMonthDays,
                                                  indexOfFirstDay
    );
    for (let i = indexOfFirstDay; i <= indexOfLastDay; i++)
    {
        result.push(generateDayOfCalendar(year, month, weekday, i));
        weekday++;
        if (weekday > WEEKDAY_SUNDAY)
            weekday = WEEKDAY_MONDAY;
    }
    return result;
}

