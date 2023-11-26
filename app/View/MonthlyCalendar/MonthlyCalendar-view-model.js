import {Dialogs, Frame, GridLayout, Label, Observable} from '@nativescript/core'
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
import {WEEKDAY_MONDAY, WEEKDAY_SATURDAY} from "~/Model/Constants/WeekdaysConstants";
import {
    CALENDAR_ITEM_CLASS_DEFAULT,
    CALENDAR_ITEM_CLASS_OUT_OF_MONTH,
    CALENDAR_ITEM_CLASS_TODAY,
    CALENDAR_ITEM_CLASS_WEEKEND
} from "~/View/Constants/CalendarItemClass";

const DATE_SWITCHER_PATH = '/View/DateSwitcher/DateSwitcher';

const viewModel = new Observable();
let calendarContent = undefined;
let calendarWeekdaysItems = [];

function createCalendarItem(text, cssClasses)
{
    let cell = new Label();
    cell.text = text;
    cell.cssClasses.add(...cssClasses);
    return cell;
}

function initCalendarWeekdaysItems()
{
    calendarWeekdaysItems = [];
    let headers = getWeekdaysNames(RU);
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
}

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

function generateCalendarContent()
{
    if (calendarWeekdaysItems.length === 0)
        initCalendarWeekdaysItems();
    let calendarItems = [...calendarWeekdaysItems];
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
            case WEEK:
                navigateTo('/View/WeeklyCalendar/WeeklyCalendar', true);
                return;
            case YEAR:
                navigateTo('/View/YearlyCalendar/YearlyCalendar', true);
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
