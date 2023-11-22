import {getUsersCurrentDay, getUsersCurrentMonth, getUsersCurrentYear} from "~/Model/getCurrentDate";
import {WEEKDAY_SATURDAY, WEEKDAY_SUNDAY} from "~/Model/WeekdaysConstants";

/**
 * Represents a day of the week.
 */
export class DayOfCalendar
{
    day;
    month;
    year;
    weekend;

    /**
     * @constructor
     * @param {number} day - The day of the month.
     * @param {number} month - The month of the year.
     * @param {number} year - The year.
     * @param {number} weekend - The weekend of the date (0 - Monday, 7 - Sunday).
     */
    constructor(day, month, year, weekend)
    {
        this.day = day;
        this.month = month;
        this.year = year;
        this.weekend = weekend;
    }

    /**
     * Checks if that date is user's current date.
     * @returns {boolean}
     */
    isCurrentDay()
    {
        return (this.year === getUsersCurrentYear()) &&
               (this.month === getUsersCurrentMonth()) &&
               (this.day === getUsersCurrentDay());
    }

    /**
     * Checks if the current day is a weekend day
     * @return {boolean}
     */
    isWeekend()
    {
        return this.weekend >= WEEKDAY_SATURDAY;
    }
}
