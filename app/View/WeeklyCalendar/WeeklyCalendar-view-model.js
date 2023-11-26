import {Dialogs, Frame, GridLayout, Label, Observable} from '@nativescript/core'
import {getUsersCurrentDay, getUsersCurrentMonth, getUsersCurrentYear} from "~/Model/getCurrentDate";
import {
    UserSelectedCalendarDateDecrementWeek, UserSelectedCalendarDateGetDay,
    UserSelectedCalendarDateGetMonth,
    UserSelectedCalendarDateGetYear,
    UserSelectedCalendarDateIncrementWeek, UserSelectedCalendarDateIsToday, UserSelectedCalendarDateSet
} from "~/Model/UserSelectedCalendarDate";
import {getWeekdaysNames} from "~/Model/CalendarNames/WeekdayNames";
import {RU} from "~/Model/Constants/LocalesConstants";
import {getMonthName} from "~/Model/CalendarNames/MonthsNames";
import {
    CALENDAR_ITEM_CLASS_DEFAULT,
    CALENDAR_ITEM_CLASS_TODAY,
    CALENDAR_ITEM_CLASS_WEEKEND
} from "~/View/Constants/CalendarItemClass";
import {generateWeeklyCalendar} from "~/Model/CalendarContentGenerator/generateWeeklyCalendar";
import {getCalendarWeekdaysItems} from "~/View/getCalendarWeekdaysItems";
import {createCalendarItem} from "~/View/createCalendarItem";

const DATE_SWITCHER_PATH = '/View/DateSwitcher/DateSwitcher';

const viewModel = new Observable();
let calendarContent = undefined;

function generateCSSclassesOfCalendarDay(calendarDay, col)
{
    let cssClasses = [CALENDAR_ITEM_CLASS_DEFAULT];
    if (col >= 5)
        cssClasses.push(CALENDAR_ITEM_CLASS_WEEKEND);
    if (calendarDay.isToday())
        cssClasses.push(CALENDAR_ITEM_CLASS_TODAY);
    return cssClasses;
}

function getCalendarDays()
{
    let year = UserSelectedCalendarDateGetYear();
    let month = UserSelectedCalendarDateGetMonth();
    let day = UserSelectedCalendarDateGetDay();
    return generateWeeklyCalendar(year, month, day);
}

function generateCalendarContentItems()
{
    let calendarItems = [...getCalendarWeekdaysItems()];
    let start = new Date().getTime();
    let calendarDays = getCalendarDays();
    let stop = new Date().getTime();
    console.log('getCalendarDays: ' + (stop - start) + 'ms');
    for (let i = 0; i < calendarDays.length; i++)
    {
        let cssClasses = generateCSSclassesOfCalendarDay(calendarDays[i], i);
        calendarItems.push(createCalendarItem(calendarDays[i].getDay(), cssClasses));
    }
    return calendarItems;
}

function updateContentOfCalendar()
{
    let start = new Date().getTime();
    let calendarItems = generateCalendarContentItems();
    let stop = new Date().getTime();
    console.log('generateCalendarContent: ' + (stop - start) + 'ms');
    start = new Date().getTime();
    calendarContent.removeChildren();
    stop = new Date().getTime();
    console.log('removeChildren: ' + (stop - start) + 'ms');
    start = new Date().getTime();
    let i = 0;
    for (let row = 0; row < 2; row++)
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
    let month = UserSelectedCalendarDateGetMonth();
    let year = UserSelectedCalendarDateGetYear();
    let newName = getMonthName(month) + ' ' + year;
    viewModel.set('dateSwitcherName', newName);
}

function updateCalendar()
{
    updateCalendarDateSwitcher();
    updateContentOfCalendar();
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

function isCalendarDisplayingTodaysDay()
{
    return (UserSelectedCalendarDateGetYear() === getUsersCurrentYear()) &&
        (UserSelectedCalendarDateGetMonth() === getUsersCurrentMonth()) &&
        (UserSelectedCalendarDateGetDay() === getUsersCurrentDay());
}

function switchCalendarToCurrentDate()
{
    if (isCalendarDisplayingTodaysDay())
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

function showDateSwitcher()
{
    navigateTo(DATE_SWITCHER_PATH, false, {
        previousPagePath: '/View/WeeklyCalendar/WeeklyCalendar'
    });
}

function changeCalendarView()
{
    const WEEK = 'Неделя';
    const MONTH = 'Месяц';
    const YEAR = 'Год';
    Dialogs.action({
        title: 'Режим',
        cancelButtonText: 'Отмена',
        actions: [WEEK, MONTH, YEAR],
        cancelable: true,
    }).then((calendarView) =>
    {
        switch (calendarView)
        {
            case YEAR:
                navigateTo('/View/YearlyCalendar/YearlyCalendar', true);
                return;
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
    viewModel.incrementMonth = incrementWeek;
    viewModel.decrementMonth = decrementWeek;
    viewModel.switchToCurrentDate = switchCalendarToCurrentDate;
    viewModel.changeCalendarView = changeCalendarView;
    viewModel.showDateSwitcher = showDateSwitcher;
    calendarContent = args.getViewById('calendarContent');
    updateCalendar();
    return viewModel;
}
