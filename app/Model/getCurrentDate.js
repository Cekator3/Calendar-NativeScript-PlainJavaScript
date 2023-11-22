let currentDate;
let currentDay;
let currentMonth;
let currentYear;

function ensureCurrentDateUpToDate()
{
    let currDate = new Date();
    let currDay = currDate.getDate();
    if (currentDay === currDay)
        return;
    currentDate = currDate;
    currentDay = currDay;
    currentMonth = currDate.getMonth();
    currentYear = currDate.getFullYear();
}

export function getUsersCurrentYear()
{
    ensureCurrentDateUpToDate();
    return currentYear;
}

/**
 * Returns current month.
 * @return {number}
 */
export function getUsersCurrentMonth()
{
    ensureCurrentDateUpToDate();
    return currentMonth;
}

/**
 * Returns current day.
 * @return {number}
 */
export function getUsersCurrentDay()
{
    ensureCurrentDateUpToDate();
    return currentDay;
}
