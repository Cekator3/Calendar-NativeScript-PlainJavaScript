import {Frame, Observable} from "@nativescript/core";
import {
    UserSelectedCalendarDateGetDay,
    UserSelectedCalendarDateGetMonth,
    UserSelectedCalendarDateGetYear, UserSelectedCalendarDateSet
} from "~/Model/UserSelectedCalendarDate";

const viewModel = new Observable();
let dateSwitcher;

function saveSelectedDate()
{
    let year = dateSwitcher.year;
    let month = dateSwitcher.month - 1;
    let day = dateSwitcher.day;
    UserSelectedCalendarDateSet(year, month, day);
    gotoPreviousPage();
}

function gotoPreviousPage()
{
    Frame.topmost().navigate({
        moduleName: viewModel.get('previousPagePath'),
        clearHistory: true
    });
}

export function createViewModel(page)
{
    viewModel.currentYear = UserSelectedCalendarDateGetYear();
    viewModel.currentMonth = UserSelectedCalendarDateGetMonth() + 1;
    viewModel.currentDay = UserSelectedCalendarDateGetDay();
    viewModel.gotoPreviousPage = gotoPreviousPage;
    viewModel.saveSelectedDate = saveSelectedDate;
    viewModel.previousPagePath = page.navigationContext.previousPagePath;
    dateSwitcher = page.getViewById('dateSwitcher');
    return viewModel;
}
