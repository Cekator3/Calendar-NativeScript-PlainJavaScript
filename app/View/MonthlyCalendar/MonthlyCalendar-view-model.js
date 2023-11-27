import {Dialogs, Frame, GridLayout, Observable} from '@nativescript/core'
import {generateMonthlyCalendar} from "~/Model/CalendarContentGenerator/generateMonthlyCalendar";
import {getUsersCurrentDay, getUsersCurrentMonth, getUsersCurrentYear} from "~/Model/getCurrentDate";
import {
    UserSelectedCalendarDateDecrementMonth, UserSelectedCalendarDateGetDay,
    UserSelectedCalendarDateGetMonth,
    UserSelectedCalendarDateGetYear,
    UserSelectedCalendarDateIncrementMonth, UserSelectedCalendarDateSet
} from "~/Model/UserSelectedCalendarDate";
import {getMonthName} from "~/Model/CalendarNames/MonthsNames";
import {
    CALENDAR_ITEM_CLASS_DEFAULT,
    CALENDAR_ITEM_CLASS_OUT_OF_MONTH,
    CALENDAR_ITEM_CLASS_TODAY,
    CALENDAR_ITEM_CLASS_WEEKEND
} from "~/View/Constants/CalendarItemClass";
import {createCalendarItem} from "~/View/createCalendarItem";
import {getCalendarWeekdaysItems} from "~/View/getCalendarWeekdaysItems";

const DATE_SWITCHER_PATH = '/View/DateSwitcher/DateSwitcher';

const viewModel = new Observable();
let calendarContent = undefined;

function isOutOfMonth(calendarDay)
{
    return UserSelectedCalendarDateGetYear() !== calendarDay.getYear() ||
           UserSelectedCalendarDateGetMonth() !== calendarDay.getMonth();
}

function generateCSSclassesOfCalendarDay(calendarDay, col)
{
    let cssClasses = [];
    if (col >= 5)
        cssClasses.push(CALENDAR_ITEM_CLASS_WEEKEND);
    if (calendarDay.isToday())
        cssClasses.push(CALENDAR_ITEM_CLASS_TODAY);
    if (isOutOfMonth(calendarDay))
        cssClasses.push(CALENDAR_ITEM_CLASS_OUT_OF_MONTH);
    else
        cssClasses.push(CALENDAR_ITEM_CLASS_DEFAULT);
    return cssClasses;
}

function getCalendarDays()
{
    let year = UserSelectedCalendarDateGetYear();
    let month = UserSelectedCalendarDateGetMonth();
    return generateMonthlyCalendar(true, year, month);
}

function generateCalendarContentItems()
{
    let calendarItems = [...getCalendarWeekdaysItems()];
    let calendarDays = getCalendarDays();
    let row = 1;
    let col = 0;
    for (let calendarDay of calendarDays)
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
    let i = 0;
    if (calendarContent.getChildAt(0) === undefined)
    {
        let calendarItems = generateCalendarContentItems();
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
    }
    else
    {
        let calendarDays = getCalendarDays();
        let col = 0;
        let i = 0;
        for (let day of calendarDays)
        {
            let currItem = calendarContent.getChildAt(i + 7);
            currItem.className = "";
            currItem.text = calendarDays[i].getDay();
            i++;
            col++;
            if (col === 7)
                col = 0;
        }
    }
}

function updateCalendarDateSwitcherName()
{
    let month = UserSelectedCalendarDateGetMonth();
    let year = UserSelectedCalendarDateGetYear();
    let newName = getMonthName(month) + ' ' + year;
    viewModel.set('dateSwitcherName', newName);
}

function updateCalendar()
{
    updateCalendarDateSwitcherName();
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
        previousPagePath: '/View/MonthlyCalendar/MonthlyCalendar'
    });
}

function changeCalendarView()
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
            case WEEK:
                navigateTo('/View/WeeklyCalendar/WeeklyCalendar', true);
                return;
            case MONTH:
            default:
                return;
        }
    });
}

export function createViewModel(args)
{
    viewModel.incrementMonth = incrementMonth;
    viewModel.decrementMonth = decrementMonth;
    viewModel.switchToCurrentDate = switchCalendarToCurrentDate;
    viewModel.changeCalendarView = changeCalendarView;
    viewModel.showDateSwitcher = showDateSwitcher;
    calendarContent = args.getViewById('calendarContent');
    updateCalendar();
    return viewModel;
}
