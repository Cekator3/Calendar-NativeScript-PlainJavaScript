import {
    MONTH_APRIL, MONTH_AUGUST, MONTH_DECEMBER,
    MONTH_FEBRUARY,
    MONTH_JANUARY, MONTH_JULY,
    MONTH_JUNE,
    MONTH_MARCH,
    MONTH_MAY, MONTH_NOVEMBER, MONTH_OCTOBER, MONTH_SEPTEMBER
} from "~/Model/Constants/MonthsConstants";

const monthNames = new Map();

initMonthNames();

function initMonthNames()
{
    monthNames.set(MONTH_JANUARY, 'Январь');
    monthNames.set(MONTH_FEBRUARY, 'Февраль');
    monthNames.set(MONTH_MARCH, 'Март');
    monthNames.set(MONTH_APRIL, 'Апрель');
    monthNames.set(MONTH_MAY, 'Май');
    monthNames.set(MONTH_JUNE, 'Июнь');
    monthNames.set(MONTH_JULY, 'Июль');
    monthNames.set(MONTH_AUGUST, 'Август');
    monthNames.set(MONTH_SEPTEMBER, 'Сентябрь');
    monthNames.set(MONTH_OCTOBER, 'Октябрь');
    monthNames.set(MONTH_NOVEMBER, 'Ноябрь');
    monthNames.set(MONTH_DECEMBER, 'Декабрь');
}

/**
 * Returns the name of a month based on the provided month number.
 * @param {number} month - The number of the month (0-11).
 * @return {string | undefined} Returns undefined if the month number is not in the range 0-11.
 */
export function getMonthName(month)
{
    return monthNames.get(month);
}
