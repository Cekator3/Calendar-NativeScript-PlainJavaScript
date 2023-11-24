import { Observable } from '@nativescript/core'
import {generateMonthlyCalendar} from "~/Model/CalendarContentGenerator/generateMonthlyCalendar";
import {getUsersCurrentDay, getUsersCurrentMonth, getUsersCurrentYear} from "~/Model/getCurrentDate";
import {
    UserSelectedCalendarDateDecrementMonth,
    UserSelectedCalendarDateGetMonth,
    UserSelectedCalendarDateGetYear,
    UserSelectedCalendarDateIncrementMonth, UserSelectedCalendarDateSet
} from "~/Model/UserSelectedCalendarDay";

const viewModel = new Observable();

function updateCalendarContent()
{
    viewModel.items = generateMonthlyCalendar(true,
                                              UserSelectedCalendarDateGetYear(),
                                              UserSelectedCalendarDateGetMonth()
    );
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

export function createViewModel()
{
    viewModel.incrementMonth = incrementMonth;
    viewModel.decrementMonth = decrementMonth;
    viewModel.displayUsersTodaysDate = displayUsersTodaysDate;
    updateCalendarContent();
    return viewModel;
}
