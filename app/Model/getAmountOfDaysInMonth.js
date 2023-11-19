import {MonthNotExistException} from "~/Model/Exceptions";

let months = new Map();
initMonthsSet();

function initMonthsSet()
{
    months.set(MONTH_JANUARY, 31);
    months.set(MONTH_FEBRUARY, 29);
    months.set(MONTH_MARCH, 29);
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
 * @throws {MonthNotExistException}
 * @return {number}
 */
export function getAmountOfDaysInMonth(month)
{
    let result =  months.get(month)
    if (result === undefined)
        throw new MonthNotExistException(month);
    return result;
}
