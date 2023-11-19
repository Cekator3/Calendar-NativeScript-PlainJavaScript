export class MonthNotExistException extends Error
{
    monthNumber;
    constructor(monthNumber)
    {
        super('Month with number ' + monthNumber + " doesn't exist.");
        this.monthNumber = monthNumber;
    }
}
