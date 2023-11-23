export class DateNotExistException extends Error
{
    year;
    month;
    day;
    constructor(year = undefined, month = undefined, day = undefined)
    {
        super('Date "' + year + '-' + month + '-' + day + '" not exist');
        this.year = year;
        this.month = month;
        this.day = day;
    }
}

export class WeekdayNotExistException extends Error
{
    weekday;
    constructor(weekday)
    {
        super('Weekday "' + weekday + '" not exist');
        this.weekday = weekday;
    }
}
