/**
 * @fileOverview A subsystem for checking the existence of a date.
 */
import {getAmountOfDaysInMonth} from "~/Model/getAmountOfDaysInMonth";
import {MONTH_DECEMBER, MONTH_JANUARY} from "~/Model/Constants/MonthsConstants";
import {MIN_AMOUNT_OF_DAYS_IN_MONTH} from "~/Model/Constants/MIN_AMOUNT_OF_DAYS_IN_MONTH";

/**
 * Checks if year exists
 * @param {number} year
 * @return {boolean}
 */
export function isYearExists(year)
{
    return Number.isInteger(year) && (year > 0);
}

/**
 * Checks if month exists
 * @param {number} month
 * @return {boolean}
 */
export function isMonthExists(month)
{
    return (month >= MONTH_JANUARY) && (month <= MONTH_DECEMBER);
}

/**
 * Checks if day of the month exists
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @return {boolean}
 */
export function isDayExists(year, month, day)
{
    return (day > 0) && ((day <= MIN_AMOUNT_OF_DAYS_IN_MONTH) ||
                         (day <= getAmountOfDaysInMonth(year, month)));
}

/**
 * Checks if date exists.
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @return {boolean}
 */
export function isDateExists(year, month, day)
{
    return isYearExists(year) && isMonthExists(month) && isDayExists(year, month, day);
}
