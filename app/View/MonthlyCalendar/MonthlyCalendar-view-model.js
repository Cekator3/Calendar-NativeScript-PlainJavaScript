import {Label, Observable} from '@nativescript/core'
import {generateMonthlyCalendar} from "~/Model/CalendarContentGenerator/generateMonthlyCalendar";
import {getUsersCurrentDay, getUsersCurrentMonth, getUsersCurrentYear} from "~/Model/getCurrentDate";
import {
    UserSelectedCalendarDateDecrementMonth,
    UserSelectedCalendarDateGetMonth,
    UserSelectedCalendarDateGetYear,
    UserSelectedCalendarDateIncrementMonth, UserSelectedCalendarDateSet
} from "~/Model/UserSelectedCalendarDate";
import {getWeekdaysNames} from "~/Model/Localization/WeekdayNames";
import {RU} from "~/Model/Constants/LocalesConstants";

const viewModel = new Observable();
let calendarContent = undefined;
const CALENDAR_CELL_CLASSES_DEFAULT = 'default';
const CALENDAR_CELL_CLASSES_OUT_OF_MONTH = 'out-of-month';
const CALENDAR_CELL_CLASSES_WEEKEND = 'weekend';
const CALENDAR_CELL_CLASSES_TODAY = 'today';

function createCalendarCell(text, row, col, cssClasses = [CALENDAR_CELL_CLASSES_DEFAULT])
{
    let cell = new Label();
    cell.text = text;
    for (let cssClass of cssClasses)
        cell.cssClasses.add(cssClass);
    calendarContent.addChildAtCell(cell, row, col);
}

function displayCalendarHeader()
{
    let headers = getWeekdaysNames(RU);
    for (let i = 0; i < 5; i++)
        createCalendarCell(headers[i], 0, i);
    for (let i = 5; i < 7; i++)
        createCalendarCell(headers[i], 0, i, [CALENDAR_CELL_CLASSES_WEEKEND]);
}

function isOutOfMonthDay(calendarDay)
{
    return UserSelectedCalendarDateGetYear() !== calendarDay.year ||
           UserSelectedCalendarDateGetMonth() !== calendarDay.month;
}

function generateCSSclassesOfDay(calendarDay)
{
    let cssClasses = [CALENDAR_CELL_CLASSES_DEFAULT];
    if (calendarDay.isWeekend())
        cssClasses.push(CALENDAR_CELL_CLASSES_WEEKEND);
    if (calendarDay.isToday())
        cssClasses.push(CALENDAR_CELL_CLASSES_TODAY);
    if (isOutOfMonthDay(calendarDay))
        cssClasses.push(CALENDAR_CELL_CLASSES_OUT_OF_MONTH);
    return cssClasses;
}

function updateDisplayOfCalendarContent()
{
    calendarContent.removeChildren();
    displayCalendarHeader();
    let row = 1;
    let col = 0;
    for (let calendarDay of viewModel.get('items'))
    {
        let cssClasses = generateCSSclassesOfDay(calendarDay);
        createCalendarCell(calendarDay.day, row, col, cssClasses);
        col++;
        if (col === 7)
        {
            col = 0;
            row++;
        }
    }
}

function updateCalendarContent()
{
    viewModel.items = generateMonthlyCalendar(true,
                                              UserSelectedCalendarDateGetYear(),
                                              UserSelectedCalendarDateGetMonth()
    );
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

function displayUsersTodaysDate()
{
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
