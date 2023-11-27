/**
 * @fileOverview
 * A subsystem for obtaining calendar days of the week as UI elements.
 */
import {getWeekdaysNames} from "~/Model/CalendarNames/WeekdayNames";
import {createCalendarItem} from "~/View/createCalendarItem";
import {CALENDAR_ITEM_CLASS_DEFAULT, CALENDAR_ITEM_CLASS_WEEKEND} from "~/View/Constants/CalendarItemClass";

function generateCalendarWeekdays()
{
    let calendarWeekdaysItems = [];
    let headers = getWeekdaysNames();
    for (let i = 0; i <= 4; i++)
    {
        let item = createCalendarItem(headers[i], [CALENDAR_ITEM_CLASS_DEFAULT]);
        calendarWeekdaysItems.push(item);
    }
    for (let i = 5; i <= 6; i++)
    {
        let item = createCalendarItem(headers[i], [CALENDAR_ITEM_CLASS_WEEKEND]);
        calendarWeekdaysItems.push(item);
    }
    return calendarWeekdaysItems;
}


const calendarWeekdays = generateCalendarWeekdays();

/**
 * Returns weekdays as calendar items. They can be used for displaying the calendar.
 * @returns {Label[]}
 */
export function getCalendarWeekdaysItems()
{
    return calendarWeekdays;
}
