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

export class LocaleNotSupportedException extends Error
{
    locale;
    constructor(locale)
    {
        super('Locale "' + '" not supported.');
        this.locale = locale;
    }
}
