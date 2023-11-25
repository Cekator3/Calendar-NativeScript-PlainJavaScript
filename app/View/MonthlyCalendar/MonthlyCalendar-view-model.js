import {GridLayout, Label, Observable} from '@nativescript/core'
import {generateMonthlyCalendar} from "~/Model/CalendarContentGenerator/generateMonthlyCalendar";
import {getUsersCurrentDay, getUsersCurrentMonth, getUsersCurrentYear} from "~/Model/getCurrentDate";
import {
    UserSelectedCalendarDateDecrementMonth, UserSelectedCalendarDateGetDay,
    UserSelectedCalendarDateGetMonth,
    UserSelectedCalendarDateGetYear,
    UserSelectedCalendarDateIncrementMonth, UserSelectedCalendarDateSet
} from "~/Model/UserSelectedCalendarDate";
import {getWeekdaysNames} from "~/Model/Localization/WeekdayNames";
import {RU} from "~/Model/Constants/LocalesConstants";
import {getMonthName} from "~/Model/Localization/MonthsNames";
import {WEEKDAY_SATURDAY} from "~/Model/Constants/WeekdaysConstants";
import {
    CALENDAR_ITEM_CLASS_DEFAULT,
    CALENDAR_ITEM_CLASS_OUT_OF_MONTH,
    CALENDAR_ITEM_CLASS_TODAY,
    CALENDAR_ITEM_CLASS_WEEKEND
} from "~/View/Constants/CalendarItemClass";

const viewModel = new Observable();
let calendarContent = undefined;
let calendarWeekdaysItems = [];

function createCalendarItem(text, cssClasses = [CALENDAR_ITEM_CLASS_DEFAULT])
{
    let cell = new Label();
    cell.text = text;
    for (let cssClass of cssClasses)
        cell.cssClasses.add(cssClass);
    return cell;
}

function initCalendarWeekdaysItems()
{
    calendarWeekdaysItems = [];
    let headers = getWeekdaysNames(RU);
    for (let i = 0; i < 5; i++)
        calendarWeekdaysItems.push(createCalendarItem(headers[i]));
    for (let i = 5; i < 7; i++)
        calendarWeekdaysItems.push(createCalendarItem(headers[i], [CALENDAR_ITEM_CLASS_WEEKEND]));
}

function isOutOfMonth(calendarDay)
{
    return UserSelectedCalendarDateGetYear() !== calendarDay.getYear() ||
           UserSelectedCalendarDateGetMonth() !== calendarDay.getMonth();
}

function generateCSSclassesOfCalendarDay(calendarDay, col)
{
    let cssClasses = [];
    if (col >= (WEEKDAY_SATURDAY - 1))
        cssClasses.push(CALENDAR_ITEM_CLASS_WEEKEND);
    if (calendarDay.isToday())
        cssClasses.push(CALENDAR_ITEM_CLASS_TODAY);
    if (isOutOfMonth(calendarDay))
        cssClasses.push(CALENDAR_ITEM_CLASS_OUT_OF_MONTH);
    else
        cssClasses.push(CALENDAR_ITEM_CLASS_DEFAULT);
    return cssClasses;
}

function generateCalendarContent()
{
    if (calendarWeekdaysItems.length === 0)
        initCalendarWeekdaysItems();
    let calendarItems = [].concat(calendarWeekdaysItems);
    let row = 1;
    let col = 0;
    for (let calendarDay of viewModel.get('calendarDays'))
    {
        let cssClasses = generateCSSclassesOfCalendarDay(calendarDay, col);
        calendarItems.push(createCalendarItem(calendarDay.getDay(), cssClasses));
        col++;
        if (col === 7)
        {
            col = 0;
            row++;
        }
    }
    return calendarItems;
}

function displayNewContentOfCalendar()
{
    let start = new Date().getTime();
    let calendarItems = generateCalendarContent();
    let stop = new Date().getTime();
    console.log('generateCalendarContent: ' + (stop - start) + 'ms');
    start = new Date().getTime();
    calendarContent.removeChildren();
    stop = new Date().getTime();
    console.log('removeChildren: ' + (stop - start) + 'ms');
    start = new Date().getTime();
    let i = 0;
    for (let row = 0; row < 7; row++)
    {
        for (let col = 0; col < 7; col++)
        {
            calendarContent.addChild(calendarItems[i]);
            GridLayout.setRow(calendarItems[i], row);
            GridLayout.setColumn(calendarItems[i], col);
            i++;
        }
    }
    stop = new Date().getTime();
    console.log('addChildren: ' + (stop - start) + 'ms');
}

function updateCalendarDateSwitcher()
{
    let dateStr = getMonthName(UserSelectedCalendarDateGetMonth(), RU) +
                        ' ' +
                        UserSelectedCalendarDateGetYear();
    viewModel.set('dateSwitcherName', dateStr);
}

function updateCalendar()
{
    let start = new Date().getTime();
    viewModel.set('calendarDays',
                  generateMonthlyCalendar(true,
                                          UserSelectedCalendarDateGetYear(),
                                          UserSelectedCalendarDateGetMonth()
                  )
    );
    let stop = new Date().getTime();
    console.log('Obtaining days from monthly generator: ' + (stop - start) + 'ms.');
    updateCalendarDateSwitcher();
    displayNewContentOfCalendar();
}

function incrementMonth()
{
    UserSelectedCalendarDateIncrementMonth();
    updateCalendar();
}

function decrementMonth()
{
    UserSelectedCalendarDateDecrementMonth();
    updateCalendar();
}

function switchCalendarToCurrentDate()
{
    let currYear = getUsersCurrentYear();
    let currMonth = getUsersCurrentMonth();
    let currDay = getUsersCurrentDay();
    let choosenDay = UserSelectedCalendarDateGetDay();
    let choosenMonth = UserSelectedCalendarDateGetMonth();
    let choosenYear = UserSelectedCalendarDateGetYear();
    if ((choosenYear === currYear) &&
        (choosenMonth === currMonth) &&
        (choosenDay === currDay))
    {
        return;
    }
    UserSelectedCalendarDateSet(currYear, currMonth, currDay);
    updateCalendar();
}

export function createViewModel(args)
{
    viewModel.incrementMonth = incrementMonth;
    viewModel.decrementMonth = decrementMonth;
    viewModel.switchToCurrentDate = switchCalendarToCurrentDate;
    calendarContent = args.getViewById('calendarContent');
    updateCalendar();
    return viewModel;
}
