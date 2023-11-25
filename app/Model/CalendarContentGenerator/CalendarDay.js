/**
 * @fileOverview
 * Subsystem for creating and modifying calendar days
 * which are used to display the calendar.
 */
import {getUsersCurrentDay, getUsersCurrentMonth, getUsersCurrentYear} from "~/Model/getCurrentDate";
import {WEEKDAY_SATURDAY} from "~/Model/Constants/WeekdaysConstants";
import {MONTH_DECEMBER, MONTH_JANUARY} from "~/Model/Constants/MonthsConstants";
import {getAmountOfDaysInMonth} from "~/Model/getAmountOfDaysInMonth";
import {getWeekdayOfDate} from "~/Model/getWeekdayOfDate";
import {isDateExists, isMonthExists, isYearExists} from "~/Model/isDateExists";
import {MIN_AMOUNT_OF_DAYS_IN_MONTH} from "~/Model/Constants/MIN_AMOUNT_OF_DAYS_IN_MONTH";

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
        this.setYear(year);
        this.setMonth(month);
        this.setDay(day);
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
        this.weekday = getWeekdayOfDate(this.getYear(), this.getMonth(), this.getDay());
    }

    /**
     * Sets the year of the calendar day.
     * @param {number} year
     * @returns {void}
     */
    setYear(year)
    {
        if (year < 1)
            this.year = 1;
        else if (year > Number.MAX_SAFE_INTEGER)
            this.year = Number.MAX_SAFE_INTEGER;
        if (this.year === year)
            return;
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
        if (isMonthExists(month))
        {
            if (this.month === month)
                return;
            this.month = month;
            this.#isWeekdayUpToDate = false;
        }
        this.month = month - 1;
        this.incrementMonth(1);
    }

    /**
     * Sets the day of the calendar day.
     * @param {number} day
     * @returns {void}
     */
    setDay(day)
    {
        if (this.day === day)
            return;
        this.day = day - 1;
        this.incrementDay(1);
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
        this.setYear(this.year + value);
    }

    /**
     * Increments the month of calendar day.
     * @param {number} value
     * @returns {void}
     */
    incrementMonth(value = 1)
    {
        if (value === 0)
            return;
        this.#isWeekdayUpToDate = false;
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
    }

    /**
     * Increments the day of calendar day.
     * @param {number} value
     * @returns {void}
     */
    incrementDay(value = 1)
    {
        if (value === 0)
            return;
        this.#isWeekdayUpToDate = false;
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
            return;
        }
        if (dayIndex < MIN_AMOUNT_OF_DAYS_IN_MONTH)
        {
            this.day = dayIndex;
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
    }
}
