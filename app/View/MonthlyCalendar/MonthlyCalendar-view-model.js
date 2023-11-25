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

const viewModel = new Observable();
let calendarContent = undefined;
let calendarHeaderCells = [];
const CALENDAR_CELL_CLASSES_DEFAULT = 'default';
const CALENDAR_CELL_CLASSES_OUT_OF_MONTH = 'out-of-month';
const CALENDAR_CELL_CLASSES_WEEKEND = 'weekend';
const CALENDAR_CELL_CLASSES_TODAY = 'today';

function createCalendarCell(text, cssClasses = [CALENDAR_CELL_CLASSES_DEFAULT])
{
    let cell = new Label();
    cell.text = text;
    for (let cssClass of cssClasses)
        cell.cssClasses.add(cssClass);
    return cell;
}

function updateCalendarHeaderCells()
{
    const START = new Date().getTime();
    calendarHeaderCells = [];
    let headers = getWeekdaysNames(RU);
    for (let i = 0; i < 5; i++)
        calendarHeaderCells.push(createCalendarCell(headers[i]));
    for (let i = 5; i < 7; i++)
        calendarHeaderCells.push(createCalendarCell(headers[i], [CALENDAR_CELL_CLASSES_WEEKEND]));
    const STOP = new Date().getTime();
    console.log('updateCalendarHeaderCells: ' + (STOP - START) + 'ms');
}

function isOutOfMonthDay(calendarDay)
{
    return UserSelectedCalendarDateGetYear() !== calendarDay.year ||
           UserSelectedCalendarDateGetMonth() !== calendarDay.month;
}

function generateCSSclassesOfDay(calendarDay, col)
{
    let cssClasses = [CALENDAR_CELL_CLASSES_DEFAULT];
    if (col >= (WEEKDAY_SATURDAY - 1))
        cssClasses.push(CALENDAR_CELL_CLASSES_WEEKEND);
    if (calendarDay.isToday())
        cssClasses.push(CALENDAR_CELL_CLASSES_TODAY);
    if (isOutOfMonthDay(calendarDay))
        cssClasses.push(CALENDAR_CELL_CLASSES_OUT_OF_MONTH);
    return cssClasses;
}

function getCalendarCells()
{
    const START = new Date().getTime();
    if (calendarHeaderCells.length === 0)
        updateCalendarHeaderCells();
    let calendarCells = [].concat(calendarHeaderCells);
    let row = 1;
    let col = 0;
    for (let calendarDay of viewModel.get('items'))
    {
        let cssClasses = generateCSSclassesOfDay(calendarDay, col);
        calendarCells.push(createCalendarCell(calendarDay.day, cssClasses));
        col++;
        if (col === 7)
        {
            col = 0;
            row++;
        }
    }
    const STOP = new Date().getTime();
    console.log('getCalendarCells: ' + (STOP - START) + 'ms');
    return calendarCells;
}

function updateDisplayOfCalendarContent()
{
    let cells = getCalendarCells();
    let start = new Date().getTime();
    calendarContent.removeChildren();
    let stop = new Date().getTime();
    console.log('removeChildren: ' + (stop - start) + 'ms');
    start = new Date().getTime();
    let i = 0;
    for (let row = 0; row < 7; row++)
    {
        for (let col = 0; col < 7; col++)
        {
            calendarContent.addChild(cells[i]);
            GridLayout.setRow(cells[i], row);
            GridLayout.setColumn(cells[i], col);
            i++;
        }
    }
    stop = new Date().getTime();
    console.log('addChildren: ' + (stop - start) + 'ms');
}

function updateCalendarContent()
{
    let start = new Date().getTime();
    viewModel.items = generateMonthlyCalendar(true,
                                              UserSelectedCalendarDateGetYear(),
                                              UserSelectedCalendarDateGetMonth()
    );
    let stop = new Date().getTime();
    console.log('Generate monthly calendar: ' + (stop - start) + 'ms.');
    start = new Date().getTime();
    let dateStr = getMonthName(UserSelectedCalendarDateGetMonth(), RU) +
                        ' ' +
                        UserSelectedCalendarDateGetYear();
    stop = new Date().getTime();
    console.log('Get month name: ' + (stop - start) + 'ms.');
    viewModel.set('currentMonth', dateStr);
    updateDisplayOfCalendarContent();
}

function incrementMonth()
{
    UserSelectedCalendarDateIncrementMonth();
    updateCalendarContent();
}

function decrementMonth()
{
    UserSelectedCalendarDateDecrementMonth();
    updateCalendarContent();
}

function displayUsersTodaysDate() {
    if (UserSelectedCalendarDateGetDay() === getUsersCurrentDay() &&
        UserSelectedCalendarDateGetMonth() === getUsersCurrentMonth() &&
        UserSelectedCalendarDateGetYear() === getUsersCurrentYear())
    {
        return;
    }
    UserSelectedCalendarDateSet(getUsersCurrentYear(),
                               getUsersCurrentMonth(),
                               getUsersCurrentDay()
    );
    updateCalendarContent();
}

export function createViewModel(args)
{
    viewModel.incrementMonth = incrementMonth;
    viewModel.decrementMonth = decrementMonth;
    viewModel.displayUsersTodaysDate = displayUsersTodaysDate;
    calendarContent = args.getViewById('calendarContent');
    updateCalendarContent();
    return viewModel;
}
