import {Dialogs, Frame, GridLayout, Label, Observable} from '@nativescript/core'
import {getUsersCurrentDay, getUsersCurrentMonth, getUsersCurrentYear} from "~/Model/getCurrentDate";
import {
    UserSelectedCalendarDateDecrementWeek, UserSelectedCalendarDateGetDay,
    UserSelectedCalendarDateGetMonth,
    UserSelectedCalendarDateGetYear,
    UserSelectedCalendarDateIncrementWeek, UserSelectedCalendarDateSet
} from "~/Model/UserSelectedCalendarDate";
import {getMonthName} from "~/Model/CalendarNames/MonthsNames";
import {
    CALENDAR_ITEM_CLASS_DEFAULT, CALENDAR_ITEM_CLASS_OUT_OF_MONTH,
    CALENDAR_ITEM_CLASS_TODAY,
    CALENDAR_ITEM_CLASS_WEEKEND
} from "~/View/Constants/CalendarItemClass";
import {generateWeeklyCalendar} from "~/Model/CalendarContentGenerator/generateWeeklyCalendar";
import {getCalendarWeekdaysItems} from "~/View/getCalendarWeekdaysItems";

const DATE_SWITCHER_PATH = '/View/DateSwitcher/DateSwitcher';

const viewModel = new Observable();
let calendarContent = undefined;

function isOutOfMonth(calendarDay)
{
    return UserSelectedCalendarDateGetYear() !== calendarDay.getYear() ||
        UserSelectedCalendarDateGetMonth() !== calendarDay.getMonth();
}

function createCSSclassesForCalendarDay(calendarDay, col)
{
    let cssClasses = '';
    if (col >= 5)
        cssClasses += CALENDAR_ITEM_CLASS_WEEKEND + ' ';
    if (calendarDay.isToday())
        cssClasses += CALENDAR_ITEM_CLASS_TODAY + ' ';
    if (isOutOfMonth(calendarDay))
        cssClasses += CALENDAR_ITEM_CLASS_OUT_OF_MONTH + ' ';
    else
        cssClasses += CALENDAR_ITEM_CLASS_DEFAULT + ' ';
    return cssClasses;
}

function getCalendarDays()
{
    let year = UserSelectedCalendarDateGetYear();
    let month = UserSelectedCalendarDateGetMonth();
    let day = UserSelectedCalendarDateGetDay();
    return generateWeeklyCalendar(year, month, day);
}


function updateCalendarItems()
{
    let start = new Date().getTime();
    let calendarDays = getCalendarDays();
    let stop = new Date().getTime();
    console.log('Creating array of calendar days: ' + (stop - start) + 'ms');
    start = new Date().getTime();
    let col = 0;
    for (let i = 0; i < calendarDays.length; i++)
    {
        let currItem = calendarContent.getChildAt(i + 7);
        currItem.className = createCSSclassesForCalendarDay(calendarDays[i], col);
        currItem.text = calendarDays[i].getDay();
        col++;
        if (col === 7)
            col = 0;
    }
    stop = new Date().getTime();
    console.log('Updating calendar days: ' + (stop - start) + 'ms');
}


function updateCalendarDateSwitcher()
{
    let month = UserSelectedCalendarDateGetMonth();
    let year = UserSelectedCalendarDateGetYear();
    let newName = getMonthName(month) + ' ' + year;
    viewModel.set('dateSwitcherName', newName);
}

function updateCalendar()
{
    updateCalendarDateSwitcher();
    updateCalendarItems();
}

function initCalendarWeekdayItems()
{
    let weekdayItems = getCalendarWeekdaysItems();
    for (let i = 0; i < 7; i++)
    {
        calendarContent.addChild(weekdayItems[i]);
        GridLayout.setRow(weekdayItems[i], 0);
        GridLayout.setColumn(weekdayItems[i], i);
    }
}

/**
 * Calendar items - graphical elements that represent calendar days.
 */
function initCalendarItems()
{
    initCalendarWeekdayItems();
    for (let row = 1; row < 7; row++)
    {
        for (let col = 0; col < 7; col++)
        {
            let item = new Label()
            calendarContent.addChild(item);
            GridLayout.setRow(item, row);
            GridLayout.setColumn(item, col);
        }
    }
}

function incrementWeek()
{
    UserSelectedCalendarDateIncrementWeek();
    updateCalendar();
}

function decrementWeek()
{
    UserSelectedCalendarDateDecrementWeek();
    updateCalendar();
}

function isCalendarOnCurrentDate()
{
    return (UserSelectedCalendarDateGetYear() === getUsersCurrentYear()) &&
           (UserSelectedCalendarDateGetMonth() === getUsersCurrentMonth());
}

function switchCalendarToCurrentDate()
{
    if (isCalendarOnCurrentDate())
        return;
    let currYear = getUsersCurrentYear();
    let currMonth = getUsersCurrentMonth();
    let currDay = getUsersCurrentDay();
    UserSelectedCalendarDateSet(currYear, currMonth, currDay);
    updateCalendar();
}


function navigateTo(path, clearHistory, context = {})
{
    calendarContent.removeChildren();
    Frame.topmost().navigate({
        moduleName: path,
        clearHistory: clearHistory,
        context: context
    });
}

function letUserSwitchDateWithDateSwitcher()
{
    navigateTo(DATE_SWITCHER_PATH, false, {
        previousPagePath: '/View/WeeklyCalendar/WeeklyCalendar'
    });
}

function changeCalendarDisplayMode()
{
    const WEEK = 'Неделя';
    const MONTH = 'Месяц';
    Dialogs.action({
        title: 'Режим',
        cancelButtonText: 'Отмена',
        actions: [WEEK, MONTH],
        cancelable: true,
    }).then((calendarView) =>
    {
        switch (calendarView)
        {
            case MONTH:
                navigateTo('/View/MonthlyCalendar/MonthlyCalendar', true);
                return;
            case WEEK:
            default:
                return;
        }
    });
}

export function createViewModel(args)
{
    viewModel.incrementWeek = incrementWeek;
    viewModel.decrementWeek = decrementWeek;
    viewModel.switchCalendarToCurrentDate = switchCalendarToCurrentDate;
    viewModel.changeCalendarDisplayMode = changeCalendarDisplayMode;
    viewModel.letUserSwitchDateWithDateSwitcher = letUserSwitchDateWithDateSwitcher;
    calendarContent = args.getViewById('calendarContent');
    initCalendarItems();
    updateCalendar();
    return viewModel;
}
