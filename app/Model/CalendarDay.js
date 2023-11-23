/**
 * @fileOverview
 * Subsystem for creating and modifying calendar days
 * which are used to display the calendar.
 */
import {getUsersCurrentDay, getUsersCurrentMonth, getUsersCurrentYear} from "~/Model/getCurrentDate";
import {WEEKDAY_SATURDAY} from "~/Model/Constants/WeekdaysConstants";
import {MONTH_DECEMBER, MONTH_JANUARY} from "~/Model/Constants/MonthsConstants";
import {isDateExists, isDayExists, isMonthExists, isWeekdayExists, isYearExists} from "~/Model/isDateExists";
import {DateNotExistException, WeekdayNotExistException} from "~/Model/Exceptions";
import {getAmountOfDaysInMonth} from "~/Model/getAmountOfDaysInMonth";

/**
 * A calendar day that is used to display the calendar.
 * (Do not access fields directly please.)
 */
export class CalendarDay
{
    #day;
    #month;
    #year;
    #weekday;

    /**
     * Creates a calendar day.
     * @param {number} day - The day of the month.
     * @param {number} month - The month of the year.
     * @param {number} weekday - The weekday of the date (0 - Monday, 7 - Sunday).
     * @param {number} year - The year.
     * @returns {CalendarDay}
     * @throws {DateNotExistException}
     * @throws {WeekdayNotExistException}
     */
    constructor(year, month, weekday, day)
    {
        //TODO remove exceptions when application is done.
        if (!isWeekdayExists(weekday))
            throw WeekdayNotExistException(weekday);
        if (!isDateExists(year, month, day))
            throw DateNotExistException(year, month, day);
        this.year = year;
        this.month = month;
        this.weekday = weekday;
        this.day = day;
    }

    /**
     * Returns the day of this calendar date.
     * @return {number}
     */
    getDay()
    {
        return this.day;
    }

    /**
     * Returns the weekday of this calendar date.
     * @return {number}
     */
    getWeekday()
    {
        return this.weekday;
    }

    /**
     * Returns the month of this calendar date.
     * @return {number}
     */
    getMonth()
    {
        return this.month;
    }

    /**
     * Returns the year of this calendar date.
     * @return {number}
     */
    getYear()
    {
        return this.year;
    }

    /**
     * Sets the year of the calendar day.
     * @param {number} year
     * @throws {DateNotExistException}
     * @returns {void}
     */
    setYear(year)
    {
        if (!isYearExists(year))
            throw new DateNotExistException(year, this.month, this.day);
        this.year = year;
    }

    /**
     * Sets the month of the calendar day.
     * @param {number} month (0 - 11)
     * @throws {DateNotExistException}
     * @returns {void}
     */
    setMonth(month)
    {
        if (!isMonthExists(month))
            throw new DateNotExistException(this.year, month, this.day);
        this.month = month;
    }

    /**
     * Sets the day of the calendar day.
     * @param {number} day
     * @throws {DateNotExistException}
     * @returns {void}
     */
    setDay(day)
    {
        if (!isDayExists(this.month, day))
            throw new DateNotExistException(this.year, this.month, day);
        this.day = day;
    }


    /**
     * Checks if that calendar day is user's today's date.
     * @return {boolean}
     */
    isToday()
    {
        return (this.year === getUsersCurrentYear()) &&
               (this.month === getUsersCurrentMonth()) &&
               (this.day === getUsersCurrentDay());
    }

    /**
     * Checks if that calendar day is weekend.
     * @return {boolean}
     */
    isWeekend()
    {
        return this.weekday >= WEEKDAY_SATURDAY;
    }

    /**
     * Increments the year of calendar day.
     * @param {number} value
     * @returns {void}
     */
    incrementYear(value = 1)
    {
        if (this.year + value < 1)
            this.year = 1;
        if (!Number.isInteger(this.year + value))
            this.year = Number.MAX_SAFE_INTEGER;
        this.year = this.year + value;
    }

    /**
     * Increments the month of calendar day.
     * @param {number} value
     * @returns {void}
     */
    incrementMonth(value = 1)
    {
        this.month += value;
        while (this.month > MONTH_DECEMBER)
        {
            this.month -= MONTH_DECEMBER;
            this.incrementYear(1);
        }
        while (this.month < MONTH_JANUARY)
        {
            this.month += MONTH_DECEMBER;
            this.incrementYear(-1);
        }
    }

    /**
     * Increments the day of calendar day.
     * @param {number} value
     * @returns {void}
     */
    incrementDay(value = 1)
    {
        let amountOfDaysInMonth = getAmountOfDaysInMonth(this.month);
        this.day += value;
        while (this.day < 1)
        {
            this.day += amountOfDaysInMonth;
            this.incrementMonth(-1);
            amountOfDaysInMonth = getAmountOfDaysInMonth(this.month);
        }
        while (this.day > amountOfDaysInMonth)
        {
            this.day -= amountOfDaysInMonth;
            this.incrementMonth(1);
            amountOfDaysInMonth = getAmountOfDaysInMonth(this.month);
        }
    }
}
