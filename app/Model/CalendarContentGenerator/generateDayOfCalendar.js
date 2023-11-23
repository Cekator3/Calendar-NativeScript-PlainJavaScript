import {MONTH_DECEMBER, MONTH_JANUARY} from "~/Model/Constants/MonthsConstants";
import {DayOfCalendar} from "~/Model/DayOfCalendar";
import {getAmountOfDaysInMonth, getAmountOfDaysInPreviousMonth} from "~/Model/getAmountOfDaysInMonth";

function generateDayFromPrevMonths(year, month, weekday, dayIndex)
{
    while (dayIndex <= 0)
    {
        dayIndex += getAmountOfDaysInPreviousMonth(month);
        if (month === MONTH_JANUARY)
        {
            year--;
            month = MONTH_DECEMBER;
        }
        else
            month--;
    }
    return new DayOfCalendar(dayIndex, month, year, weekday);
}

function generateDayFromCurrOrNextMonths(year, month, weekday, dayIndex)
{
    let lastDayOfCurrMonth = getAmountOfDaysInMonth(month);
    while (dayIndex > lastDayOfCurrMonth)
    {
        dayIndex -= lastDayOfCurrMonth;
        if (month === MONTH_DECEMBER)
        {
            year++;
            month = MONTH_JANUARY;
        }
        else
            month++;
        lastDayOfCurrMonth = getAmountOfDaysInMonth(month);
    }
    return new DayOfCalendar(dayIndex, month, year, weekday)
}

/**
 * Creates a calendar day.
 *
 * @param {number} year
 * @param {number} month
 * @param {number} weekday
 * @param {number} dayIndex - The index of the day.
 * If the index is <= 0, then the day is in one of the previous months.
 * If the index is not in the range of the current month, then the day is in one of the next months.
 * @return {DayOfCalendar}
 */
export function generateDayOfCalendar(year, month, weekday, dayIndex)
{
    if (dayIndex <= 0)
        return generateDayFromPrevMonths(year, month, weekday, dayIndex);
    return generateDayFromCurrOrNextMonths(year, month, weekday, dayIndex);
}
