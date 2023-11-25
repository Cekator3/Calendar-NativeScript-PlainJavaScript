import {CalendarDay} from "~/Model/CalendarContentGenerator/CalendarDay";

/**
 * Creates a calendar day.
 * @param {number} year
 * @param {number} month
 * @param {number} dayIndex - The index of the day.
 * If the index is <= 0, then the day is in one of the previous months.
 * If the index is not in the range of the current month, then the day is in one of the next months.
 * @return {CalendarDay}
 */
export function generateDayOfCalendar(year, month, dayIndex)
{
    return new CalendarDay(year, month, dayIndex);
}
