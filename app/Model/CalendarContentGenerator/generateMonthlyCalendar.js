import {getWeekdayOfDate} from "~/Model/getWeekdayOfDate";
import {getAmountOfDaysInMonth} from "~/Model/getAmountOfDaysInMonth";
import {CalendarDay} from "~/Model/CalendarContentGenerator/CalendarDay";

function getIndexOfLastDay(year, month, isIncludingOutOfMonthDays, indexOfFirstDay)
{
    if (!isIncludingOutOfMonthDays)
        return indexOfFirstDay + getAmountOfDaysInMonth(year, month) - 1;
    return indexOfFirstDay + 42 - 1;
}

function getIndexOfFirstDay(year, month, isIncludingOutOfMonthDays)
{
    if (!isIncludingOutOfMonthDays)
        return 1;
    return 2 - getWeekdayOfDate(year, month, 1);
}

/**
 * Generates calendar content for the month containing the specified date.
 * @param {boolean} isIncludingOutOfMonthDays Is out-of-month days must be included.
 * @param {number} year
 * @param {number} month
 * @returns {CalendarDay[]}
 */
export function generateMonthlyCalendar(isIncludingOutOfMonthDays, year, month)
{
    let result = [];
    let indexOfFirstDay = getIndexOfFirstDay(year, month, isIncludingOutOfMonthDays);
    let indexOfLastDay = getIndexOfLastDay(year,
                                           month,
                                           isIncludingOutOfMonthDays,
                                           indexOfFirstDay
    );
    for (let i = indexOfFirstDay; i <= indexOfLastDay; i++)
        result.push(new CalendarDay(year, month, i));
    return result;
}

