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
import {isDateExists} from "~/Model/isDateExists";

/**
 * A calendar day that is used to display the calendar.
 */
export class CalendarDay
{
    #day;
    #month;
    #year;
    #weekday;
    #isWeekdayUpToDate;

    /**
     * Creates a calendar day.
     * @param {number} day - The day of the month.
     * @param {number} month - The month of the year.
     * @param {number} year - The year.
     * @returns {CalendarDay}
     */
    constructor(year, month, day)
    {
        this.year = year;
        this.month = month;
        this.day = day;
        this.#isWeekdayUpToDate = false;
    }

    /**
     * Checks if this calendar day contains a valid date.
     * @return {boolean}
     */
    isDateValid()
    {
        return isDateExists(this.year, this.month, this.day);
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
        if (!this.#isWeekdayUpToDate)
        {
            this.#isWeekdayUpToDate = true;
            this.#updateWeekday();
        }
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
     * @returns {void}
     */
    setYear(year)
    {
        this.year = year;
        this.#isWeekdayUpToDate = false;
    }

    /**
     * Sets the month of the calendar day.
     * @param {number} month (0 - 11)
     * @returns {void}
     */
    setMonth(month)
    {
        this.month = month;
        this.#isWeekdayUpToDate = false;
    }

    /**
     * Sets the day of the calendar day.
     * @param {number} day
     * @returns {void}
     */
    setDay(day)
    {
        this.day = day;
        this.#isWeekdayUpToDate = false;
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
        if (!this.#isWeekdayUpToDate)
        {
            this.#isWeekdayUpToDate = true;
            this.#updateWeekday();
        }
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
        this.#isWeekdayUpToDate = false;
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
        this.#isWeekdayUpToDate = false;
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
        if (dayIndex < 1)
        {
            while (dayIndex < 1)
            {
                this.incrementMonth(-1);
                amountOfDaysInMonth = getAmountOfDaysInMonth(this.year, this.month);
                dayIndex += amountOfDaysInMonth;
            }
            this.day = dayIndex;
            this.#isWeekdayUpToDate = false;
            return;
        }
        const MIN_AMOUNT_OF_DAYS_IN_MONTH = 28;
        if (dayIndex < MIN_AMOUNT_OF_DAYS_IN_MONTH)
        {
            this.day = dayIndex;
            this.#isWeekdayUpToDate = false;
            return;
        }
        amountOfDaysInMonth = getAmountOfDaysInMonth(this.year, this.month);
        while (dayIndex > amountOfDaysInMonth)
        {
            dayIndex -= amountOfDaysInMonth;
            this.incrementMonth(1);
            if (dayIndex < MIN_AMOUNT_OF_DAYS_IN_MONTH)
                break;
            amountOfDaysInMonth = getAmountOfDaysInMonth(this.year, this.month);
        }
        this.day = dayIndex;
        this.#isWeekdayUpToDate = false;
    }
}
