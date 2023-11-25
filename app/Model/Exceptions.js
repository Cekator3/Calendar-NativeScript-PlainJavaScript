export class LocaleNotSupportedException extends Error
{
    locale;
    constructor(locale)
    {
        super('Locale "' + '" not supported.');
        this.locale = locale;
    }
}
