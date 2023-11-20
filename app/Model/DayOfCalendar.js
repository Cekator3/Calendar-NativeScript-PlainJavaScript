export class DayOfCalendar
{
    day;
    isOutOfMonthDay;
    isWeekend;

    /**
     * @param {number} day - The day of the week.
     * @param {boolean} isOutOfMonthDay - Indicates if the day is outside the current month.
     * @param {boolean} isWeekend - Indicates if the day is a weekend day.
     */
    constructor(day, isOutOfMonthDay, isWeekend)
    {
        this.day = day;
        this.isOutOfMonthDay = isOutOfMonthDay;
        this.isWeekend = isWeekend;
    }
}
