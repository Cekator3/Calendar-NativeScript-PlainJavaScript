import {generateWeeklyCalendar} from "~/Model/CalendarContentGenerator/generateWeeklyCalendar";
import {MONTH_DECEMBER, MONTH_JANUARY} from "~/Model/Constants/MonthsConstants";
import {getAmountOfDaysInMonth} from "~/Model/getAmountOfDaysInMonth";
import {generateMonthlyCalendar} from "~/Model/CalendarContentGenerator/generateMonthlyCalendar";
import {getUsersCurrentMonth, getUsersCurrentYear} from "~/Model/getCurrentDate";

QUnit.test("Should generate calendar content for the week.", testGenerateWeeklyCalendar);
QUnit.test("Should generate calendar content for the month.", testGenerateMonthlyCalendar);
QUnit.test("Should generate calendar content for the month performance test.", testGenerateMonthlyCalendarPerformanceTest);
QUnit.test("Should generate calendar content for the month isWeekend performance test.", testGenerateMonthlyCalendarIsWeekendPerformanceTest);

function testGenerateWeeklyCalendar(assert)
{
    const year = getUsersCurrentYear();
    const month = getUsersCurrentMonth();
    let amountOfDays = getAmountOfDaysInMonth(year, month);
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
    let amountOfDays = getAmountOfDaysInMonth(year, month);
    let days = [1, amountOfDays / 2, amountOfDays];
    for (let day of days)
    {
        let result = generateMonthlyCalendar(true, year, month);
        assert.equal(result.length, 42);
        result = generateMonthlyCalendar(false, year, month);
        assert.equal(result.length, amountOfDays);
    }
}

function testGenerateMonthlyCalendarPerformanceTest(assert)
{
    const year = getUsersCurrentYear();
    let totalExecutionTime = 0;
    let executedTimes = 0;
    for (let i = 0; i < 1000; i++)
    {
        for (let month = MONTH_JANUARY; month <= MONTH_DECEMBER; month++)
        {
            let amountOfDays = getAmountOfDaysInMonth(year, month);
            for (let day = 1; day <= amountOfDays; day++)
            {
                let start = new Date().getTime();
                let result = generateMonthlyCalendar(true, year, month);
                let stop = new Date().getTime();
                totalExecutionTime += (stop - start);
                executedTimes++;
            }
        }
    }
    console.log('');
    console.log('Monthly calendar generator: Average execution time: ' +
                                        (totalExecutionTime / executedTimes) + 'ms.');
    console.log('');
    assert.true(true);
}

function testGenerateMonthlyCalendarIsWeekendPerformanceTest(assert)
{
    const year = getUsersCurrentYear();
    let totalExecutionTime = 0;
    let executedTimes = 0;
    for (let i = 0; i < 1000; i++)
    {
        for (let month = MONTH_JANUARY; month <= MONTH_DECEMBER; month++)
        {
            let amountOfDays = getAmountOfDaysInMonth(year, month);
            for (let day = 1; day <= amountOfDays; day++)
            {
                let result = generateMonthlyCalendar(true, year, month);
                for (let day of result)
                {
                    let start = new Date().getTime();
                    day.isWeekend();
                    let stop = new Date().getTime();
                    totalExecutionTime += (stop - start);
                    executedTimes++;
                }
            }
        }
    }
    console.log('');
    console.log('Is weekend: Average execution time: ' +
        (totalExecutionTime / executedTimes) + 'ms.');
    console.log('');
    assert.true(true);
}
