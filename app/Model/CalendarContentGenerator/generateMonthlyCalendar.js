import {getWeekday} from "~/Model/getWeekday";
import {getAmountOfDaysInMonth} from "~/Model/getAmountOfDaysInMonth";
import {generateDayOfCalendar} from "~/Model/CalendarContentGenerator/generateDayOfCalendar";

function getIndexOfLastDay(month, isIncludingOutOfMonthDays, indexOfFirstDay)
{
    if (!isIncludingOutOfMonthDays)
        return indexOfFirstDay + getAmountOfDaysInMonth(month) - 1;
    return indexOfFirstDay + 42 - 1;
}

function getIndexOfFirstDay(year, month, isIncludingOutOfMonthDays)
{
    if (!isIncludingOutOfMonthDays)
        return 1;
    return 2 - getWeekday(year, month, 1);
}

/**
 * Generates calendar content for the month containing the specified date.
 * @param {boolean} isIncludingOutOfMonthDays Is out-of-month days must be included.
 * @param {number} year
 * @param {number} month
 * @throws {DateNotExistException}
 * @returns {CalendarDay[]}
 */
export function generateMonthlyCalendar(isIncludingOutOfMonthDays, year, month)
{
    let result = [];
    let indexOfFirstDay = getIndexOfFirstDay(year, month, isIncludingOutOfMonthDays);
    let indexOfLastDay = getIndexOfLastDay(month,
                                           isIncludingOutOfMonthDays,
                                           indexOfFirstDay
    );
    for (let i = indexOfFirstDay; i <= indexOfLastDay; i++)
        result.push(generateDayOfCalendar(year, month, i));
    return result;
}

