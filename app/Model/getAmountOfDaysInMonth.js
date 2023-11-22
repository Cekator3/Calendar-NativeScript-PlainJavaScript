import {DateNotExistException} from "~/Model/Exceptions";
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
} from "~/Model/MonthsConstants";

let months = new Map();
initMonthsSet();

function initMonthsSet()
{
    months.set(MONTH_JANUARY, 31);
    months.set(MONTH_FEBRUARY, 28);
    months.set(MONTH_MARCH, 31);
    months.set(MONTH_APRIL, 30);
    months.set(MONTH_MAY, 31);
    months.set(MONTH_JUNE, 30);
    months.set(MONTH_JULY, 31);
    months.set(MONTH_AUGUST, 31);
    months.set(MONTH_SEPTEMBER, 30);
    months.set(MONTH_OCTOBER, 31);
    months.set(MONTH_NOVEMBER, 30);
    months.set(MONTH_DECEMBER, 31);
}

/**
 * Returns amount of days in month.
 * @param {number} month. Number of month.
 * @throws {DateNotExistException}
 * @return {number}
 */
export function getAmountOfDaysInMonth(month)
{
    let result =  months.get(month)
    if (result === undefined)
        throw new DateNotExistException(month);
    return result;
}

/**
 * Returns the number of days in the previous month.
 *
 * @param {number} month - The current month.
 * @returns {number} - The number of days in the previous month.
 */
export function getAmountOfDaysInPreviousMonth(month)
{
    if (month === MONTH_JANUARY)
        return getAmountOfDaysInMonth(MONTH_DECEMBER);
    return getAmountOfDaysInMonth(month - 1);
}
