/**
 * @fileOverview
 * Subsystem for storing the user-selected date
 * against which the calendar is displayed.
 */
import {getUsersCurrentDay, getUsersCurrentMonth, getUsersCurrentYear} from "~/Model/getCurrentDate";
import {CalendarDay} from "~/Model/CalendarContentGenerator/CalendarDay";

let selectedCalendarDate = new CalendarDay(getUsersCurrentYear(),
                                                      getUsersCurrentMonth(),
                                                      getUsersCurrentDay());

/**
 * Set the calendar date selected by the user
 * @param {number} year
 * @param {number} month The month of the date (0-11)
 * @param {number} day
 * @returns {void}
 */
export function UserSelectedCalendarDateSet(year = undefined, month = undefined, day = undefined)
{
    if (year !== undefined)
        selectedCalendarDate.setYear(year);
    if (month !== undefined)
        selectedCalendarDate.setMonth(month);
    if (day !== undefined)
        selectedCalendarDate.setDay(day);
}

/**
 * Returns the year of the selected calendar date.
 * @returns {number}
 */
export function UserSelectedCalendarDateGetYear()
{
    return selectedCalendarDate.getYear();
}

/**
 * Returns the month of the selected calendar date.
 * @returns {number}
 */
export function UserSelectedCalendarDateGetMonth()
{
    return selectedCalendarDate.getMonth();
}

/**
 * Returns the day of the selected calendar date.
 * @returns {number}
 */
export function UserSelectedCalendarDateGetDay()
{
    return selectedCalendarDate.getDay();
}

/**
 * Increments the week of the selected calendar date.
 * @returns {number}
 */
export function UserSelectedCalendarDateIncrementWeek()
{
    selectedCalendarDate.incrementDay(7);
}

/**
 * Increments the month of the selected calendar date.
 * @returns {number}
 */
export function UserSelectedCalendarDateIncrementMonth()
{
    selectedCalendarDate.incrementMonth(1);
}

/**
 * Increments the year of the selected calendar date.
 * @returns {number}
 */
export function UserSelectedCalendarDateIncrementYear()
{
    selectedCalendarDate.incrementYear(1);
}

/**
 * Decrements the week of the selected calendar date.
 * @returns {number}
 */
export function UserSelectedCalendarDateDecrementWeek()
{
    selectedCalendarDate.incrementDay(-7);
}

/**
 * Decrements the month of the selected calendar date.
 * @returns {number}
 */
export function UserSelectedCalendarDateDecrementMonth()
{
    selectedCalendarDate.incrementMonth(-1);
}

/**
 * Decrements the year of the selected calendar date.
 * @returns {number}
 */
export function UserSelectedCalendarDateDecrementYear()
{
    selectedCalendarDate.incrementYear(-1);
}
