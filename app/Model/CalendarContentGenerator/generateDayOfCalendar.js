import {MONTH_DECEMBER, MONTH_JANUARY} from "~/Model/MonthsConstants";
import {DayOfCalendar} from "~/Model/DayOfCalendar";
import {getAmountOfDaysInMonth, getAmountOfDaysInPreviousMonth} from "~/Model/getAmountOfDaysInMonth";

export function generateDayOfCalendar(year, month, weekday, dayIndex)
{
    if (dayIndex <= 0)
    {
        while (dayIndex <= 0)
        {
            dayIndex += getAmountOfDaysInPreviousMonth(month);
            if (month === MONTH_JANUARY)
                year--;
            month--;
        }
        return new DayOfCalendar(dayIndex, month, year, weekday);
    }
    let lastDayOfCurrMonth = getAmountOfDaysInMonth(month);
    while (dayIndex > lastDayOfCurrMonth)
    {
        dayIndex -= lastDayOfCurrMonth;
        if (month === MONTH_DECEMBER)
        {
            year++;
            month = MONTH_JANUARY;
        }
        else
            month++;
        lastDayOfCurrMonth = getAmountOfDaysInMonth(month);
    }
    return new DayOfCalendar(dayIndex, month, year, weekday)
}
