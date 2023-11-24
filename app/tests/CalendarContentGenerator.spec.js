import {generateWeeklyCalendar} from "~/Model/CalendarContentGenerator/generateWeeklyCalendar";
import {MONTH_JANUARY} from "~/Model/Constants/MonthsConstants";
import {getAmountOfDaysInMonth} from "~/Model/getAmountOfDaysInMonth";
import {generateMonthlyCalendar} from "~/Model/CalendarContentGenerator/generateMonthlyCalendar";
import {getUsersCurrentMonth, getUsersCurrentYear} from "~/Model/getCurrentDate";
import {generateYearlyCalendar} from "~/Model/CalendarContentGenerator/generateYearlyCalendar";

QUnit.test("Should generate calendar content for the week.", testGenerateWeeklyCalendar);
QUnit.test("Should generate calendar content for the month.", testGenerateMonthlyCalendar);
QUnit.test("Should generate calendar content for the year.", testGenerateYearlyCalendar);

function testGenerateWeeklyCalendar(assert)
{
    const year = getUsersCurrentYear();
    const month = getUsersCurrentMonth();
    let amountOfDays = getAmountOfDaysInMonth(month);
    let days = [1, amountOfDays / 2, amountOfDays];
    for (let day of days)
    {
        let result = generateWeeklyCalendar(year, month, day);
        assert.equal(result.length, 7);
    }
}

function testGenerateMonthlyCalendar(assert)
{
    const year = getUsersCurrentYear();
    const month = getUsersCurrentMonth();
    let amountOfDays = getAmountOfDaysInMonth(month);
    let days = [1, amountOfDays / 2, amountOfDays];
    for (let day of days)
    {
        let result = generateMonthlyCalendar(true, year, month);
        assert.equal(result.length, 42);
        result = generateMonthlyCalendar(false, year, month);
        assert.equal(result.length, amountOfDays);
    }
}

function testGenerateYearlyCalendar(assert)
{
    const year = getUsersCurrentYear();
    let result = generateYearlyCalendar(year);
    let monthNumber = MONTH_JANUARY;
    for (let month of result)
    {
        assert.equal(month.length, getAmountOfDaysInMonth(monthNumber))
        monthNumber++;
    }
}
