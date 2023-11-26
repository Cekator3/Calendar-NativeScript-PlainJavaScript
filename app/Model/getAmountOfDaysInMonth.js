/**
 * @fileOverview A subsystem for determining the number of days in a month.
 */
import {
    MONTH_APRIL,
    MONTH_AUGUST,
    MONTH_DECEMBER,
    MONTH_FEBRUARY,
    MONTH_JANUARY,
    MONTH_JULY,
    MONTH_JUNE,
    MONTH_MARCH,
    MONTH_MAY,
    MONTH_NOVEMBER,
    MONTH_OCTOBER,
    MONTH_SEPTEMBER
} from "~/Model/Constants/MonthsConstants";

const amountOfDaysInMonth = new Map();
init()

function init()
{
    amountOfDaysInMonth.set(MONTH_JANUARY, 31);
    amountOfDaysInMonth.set(MONTH_FEBRUARY, 28);
    amountOfDaysInMonth.set(MONTH_MARCH, 31);
    amountOfDaysInMonth.set(MONTH_APRIL, 30);
    amountOfDaysInMonth.set(MONTH_MAY, 31);
    amountOfDaysInMonth.set(MONTH_JUNE, 30);
    amountOfDaysInMonth.set(MONTH_JULY, 31);
    amountOfDaysInMonth.set(MONTH_AUGUST, 31);
    amountOfDaysInMonth.set(MONTH_SEPTEMBER, 30);
    amountOfDaysInMonth.set(MONTH_OCTOBER, 31);
    amountOfDaysInMonth.set(MONTH_NOVEMBER, 30);
    amountOfDaysInMonth.set(MONTH_DECEMBER, 31);
}

function isLeapYear(year)
{
    return ((year % 4) === 0) &&
           (((year % 100) !== 0) || ((year % 400) === 0));
}

/**
 * Returns amount of days in month.
 * @param {number} year
 * @param {number} month (0 - 11)
 * @return {number | undefined} Returns undefined if month is invalid.
 */
export function getAmountOfDaysInMonth(year, month)
{
    if ((month === MONTH_FEBRUARY) && isLeapYear(year))
        return 29;
    return amountOfDaysInMonth.get(month);
}
