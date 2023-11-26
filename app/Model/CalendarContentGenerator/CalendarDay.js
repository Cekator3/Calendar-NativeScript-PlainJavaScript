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
import {isMonthExists} from "~/Model/isDateExists";
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
     * @param {number} day
     * @param {number} month - The month (0-11).
     * @param {number} year
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
        return this.#day;
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
        return this.#weekday;
    }

    /**
     * Returns the month of this calendar date.
     * @return {number}
     */
    getMonth()
    {
        return this.#month;
    }

    /**
     * Returns the year of this calendar date.
     * @return {number}
     */
    getYear()
    {
        return this.#year;
    }

    #updateWeekday()
    {
        this.#weekday = getWeekdayOfDate(this.#year, this.#month, this.#day);
        this.#isWeekdayUpToDate = true;
    }

    /**
     * Sets the year of the calendar day.
     * @param {number} year
     * @returns {void}
     */
    setYear(year)
    {
        if (year < 1)
            year = 1;
        else if (year > Number.MAX_SAFE_INTEGER)
            year = Number.MAX_SAFE_INTEGER;
        if (this.#year === year)
            return;
        this.#year = year;
        this.#isWeekdayUpToDate = false;
    }

    /**
     * Sets the month of the calendar day.
     * @param {number} month (0 - 11)
     * @returns {void}
     */
    setMonth(month)
    {
        if (this.#month === month)
            return;
        this.#isWeekdayUpToDate = false;
        // Check if the month can be directly set.
        if (isMonthExists(month))
        {
            this.#month = month;
            return;
        }
        // Normalize the month by incrementing or decrementing the year.
        let yearsToIncrement = 0;
        while (month > MONTH_DECEMBER)
        {
            month -= (MONTH_DECEMBER + 1);
            yearsToIncrement++;
        }
        while (month < MONTH_JANUARY)
        {
            month += (MONTH_DECEMBER + 1);
            yearsToIncrement--;
        }
        this.incrementYear(yearsToIncrement);
        this.#month = month;
    }

    /**
     * Sets the day of the calendar day.
     * @param {number} day
     * @returns {void}
     */
    setDay(day)
    {
        if (this.#day === day)
            return;
        this.#isWeekdayUpToDate = false;
        // Check if the day can be safely directly set.
        if ((day >= 1) && (day <= MIN_AMOUNT_OF_DAYS_IN_MONTH))
        {
            this.#day = day;
            return;
        }
        // If needed, normalize the day by decrementing the month.
        if (day < 1)
        {
            while (day < 1)
            {
                this.incrementMonth(-1);
                day += getAmountOfDaysInMonth(this.#year, this.#month);
            }
            this.#day = day;
            return;
        }
        // If needed, normalize the day by incrementing the month.
        let amountOfDaysInMonth = getAmountOfDaysInMonth(this.#year, this.#month);
        while (day > amountOfDaysInMonth)
        {
            day -= amountOfDaysInMonth;
            this.incrementMonth(1);
            if (day <= MIN_AMOUNT_OF_DAYS_IN_MONTH)
                break;
            amountOfDaysInMonth = getAmountOfDaysInMonth(this.#year, this.#month);
        }
        this.#day = day;
    }

    /**
     * Checks if that calendar day is user's today's date.
     * @return {boolean}
     */
    isToday()
    {
        return (this.#year === getUsersCurrentYear()) &&
               (this.#month === getUsersCurrentMonth()) &&
               (this.#day === getUsersCurrentDay());
    }

    /**
     * Checks if that calendar day is weekend.
     * @return {boolean}
     */
    isWeekend()
    {
        if (!this.#isWeekdayUpToDate)
            this.#updateWeekday();
        return this.#weekday >= WEEKDAY_SATURDAY;
    }

    /**
     * Increments the year of calendar day.
     * @param {number} value
     * @returns {void}
     */
    incrementYear(value = 1)
    {
        this.setYear(this.#year + value);
    }

    /**
     * Increments the month of calendar day.
     * @param {number} value
     * @returns {void}
     */
    incrementMonth(value = 1)
    {
        this.setMonth(this.#month + value);
    }

    /**
     * Increments the day of calendar day.
     * @param {number} value
     * @returns {void}
     */
    incrementDay(value = 1)
    {
        this.setDay(this.#day + value);
    }
}
