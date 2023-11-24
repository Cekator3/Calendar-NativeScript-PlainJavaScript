/**
 * @fileOverview
 * Subsystem for creating and modifying calendar days
 * which are used to display the calendar.
 */
import {getUsersCurrentDay, getUsersCurrentMonth, getUsersCurrentYear} from "~/Model/getCurrentDate";
import {WEEKDAY_SATURDAY} from "~/Model/Constants/WeekdaysConstants";
import {MONTH_DECEMBER, MONTH_JANUARY} from "~/Model/Constants/MonthsConstants";
import {DateNotExistException} from "~/Model/Exceptions";
import {getAmountOfDaysInMonth} from "~/Model/getAmountOfDaysInMonth";
import {getWeekdayOfDate} from "~/Model/getWeekdayOfDate";

/**
 * A calendar day that is used to display the calendar.
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
     * @param {number} year - The year.
     * @returns {CalendarDay}
     * @throws {DateNotExistException}
     */
    constructor(year, month, day)
    {
        this.year = year;
        this.month = month;
        this.day = day;
        this.#updateWeekday();
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

    #updateWeekday()
    {
        this.weekday = getWeekdayOfDate(this.year, this.month, this.day);
    }

    /**
     * Sets the year of the calendar day.
     * @param {number} year
     * @throws {DateNotExistException}
     * @returns {void}
     */
    setYear(year)
    {
        this.year = year;
        this.#updateWeekday();
    }

    /**
     * Sets the month of the calendar day.
     * @param {number} month (0 - 11)
     * @throws {DateNotExistException}
     * @returns {void}
     */
    setMonth(month)
    {
        this.month = month;
        this.#updateWeekday();
    }

    /**
     * Sets the day of the calendar day.
     * @param {number} day
     * @throws {DateNotExistException}
     * @returns {void}
     */
    setDay(day)
    {
        this.day = day;
        this.#updateWeekday();
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
        this.#updateWeekday();
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
            this.month -= MONTH_DECEMBER + 1;
            this.incrementYear(1);
        }
        while (this.month < MONTH_JANUARY)
        {
            this.month += MONTH_DECEMBER + 1;
            this.incrementYear(-1);
        }
        this.#updateWeekday();
    }

    /**
     * Increments the day of calendar day.
     * @param {number} value
     * @returns {void}
     */
    incrementDay(value = 1)
    {
        let amountOfDaysInMonth = undefined;
        let dayIndex = this.day + value;
        while (dayIndex < 1)
        {
            this.incrementMonth(-1);
            amountOfDaysInMonth = getAmountOfDaysInMonth(this.year, this.month);
            dayIndex += amountOfDaysInMonth;
        }
        if (amountOfDaysInMonth === undefined)
            amountOfDaysInMonth = getAmountOfDaysInMonth(this.year, this.month);
        while (dayIndex > amountOfDaysInMonth)
        {
            dayIndex -= amountOfDaysInMonth;
            this.incrementMonth(1);
            amountOfDaysInMonth = getAmountOfDaysInMonth(this.year, this.month);
        }
        this.day = dayIndex;
        this.#updateWeekday();
    }
}
