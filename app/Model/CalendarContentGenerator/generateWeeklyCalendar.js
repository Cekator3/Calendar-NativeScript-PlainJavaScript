import {getAmountOfDaysInMonth} from "~/Model/getAmountOfDaysInMonth";
import {DayOfCalendar} from "~/Model/DayOfCalendar";
import {getWeekday} from "~/Model/WeekdayOfFirstDay";
import {MONTH_DECEMBER, MONTH_JANUARY} from "~/Model/MonthsConstants";

function getAmountOfDaysInPreviousMonth(month)
{
    if (month === MONTH_JANUARY)
        return getAmountOfDaysInMonth(MONTH_DECEMBER);
    return getAmountOfDaysInMonth(month - 1);
}

/**
 * Generates an array of `DayOfCalendar` objects starting from a given day,
 * for a specified number of days.
 *
 * @param {number} amount - The number of days to generate.
 * @param {number} startingDay - The starting day.
 * @param {number} weekdayOfStartingDay - The weekday of the starting day.
 * @param {boolean} isOutOfMonthDays - Indicates if the generated days are out of the month range.
 * @returns {DayOfCalendar[]} - An array of `DayOfCalendar` objects.
 */
function addDays(amount, startingDay, weekdayOfStartingDay, isOutOfMonthDays)
{
    let result = [];
    let currWeekday = weekdayOfStartingDay;
    for (let i = startingDay; i < startingDay + amount; i++, currWeekday++)
    {
        result.push(
            new DayOfCalendar(i, isOutOfMonthDays, currWeekday > 5)
        );
    }
    return result;
}

function addDaysFromPreviousMonth(year, month, weekday, day)
{
    if (day > weekday)
        return [];
    let amountOfDaysToAdd = weekday - day;
    let amountOfDaysInPrevMonth = getAmountOfDaysInPreviousMonth(month);
    let firstDayOfWeek = amountOfDaysInPrevMonth - amountOfDaysToAdd + 1;
    return addDays(amountOfDaysToAdd, firstDayOfWeek, weekday, true);
}

function addDaysFromCurrentMonth(year, month, weekday, day)
{
    let amountOfDaysInMonth = getAmountOfDaysInMonth(month);
    if (day <= weekday)
    {
        return addDays(
            7 - weekday + day,
            1,
            weekday - day - 1,
            false
        );
    }
    let amountOfDaysToAdd = amountOfDaysInMonth - (day - weekday);
    if (amountOfDaysToAdd > 7)
        amountOfDaysToAdd = 7;
    return addDays(amountOfDaysToAdd, day - weekday + 1, weekday, false);
}

function addDaysFromNextMonth(year, month, weekday, day)
{
    let amountOfDaysInCurrMonth = getAmountOfDaysInMonth(month);
    let amountOfDaysToAdd = (day + (7 - weekday)) - amountOfDaysInCurrMonth;
    if (amountOfDaysToAdd < 0)
        return [];
    return addDays(amountOfDaysToAdd, 1, 7 - amountOfDaysToAdd + 1, true);
}


/**
 * Generates calendar content for the week containing the specified date.
 * @param {number} year The year of the specified date.
 * @param {number} month The month of the specified date.
 * @param {number} day The day of the specified date.
 * @throws {DateNotExistException}
 * @returns {DayOfCalendar[]}
 */
export function generateWeeklyCalendar(year, month, day)
{
    let weekday = getWeekday(year, month, day);
    // console.log(
    //     addDaysFromPreviousMonth(year, month, weekday, day),
    //     addDaysFromCurrentMonth(year, month, weekday, day),
    //     addDaysFromNextMonth(year, month, weekday, day)
    // )
    return [].concat(
        addDaysFromPreviousMonth(year, month, weekday, day),
        addDaysFromCurrentMonth(year, month, weekday, day),
        addDaysFromNextMonth(year, month, weekday, day)
    );
}
