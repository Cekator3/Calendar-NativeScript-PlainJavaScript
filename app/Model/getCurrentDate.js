/**
 * @fileOverview Subsystem for obtaining data about the user's current day.
 */
let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

export function getUsersCurrentYear()
{
    return currentYear;
}

/**
 * Returns current month.
 * @return {number}
 */
export function getUsersCurrentMonth()
{
    return currentMonth;
}

/**
 * Returns current day.
 * @return {number}
 */
export function getUsersCurrentDay()
{
    return currentDay;
}
