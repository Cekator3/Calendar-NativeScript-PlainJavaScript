import {LocaleNotSupportedException} from "~/Model/Exceptions";
import {RU} from "~/Model/Constants/LocalesConstants";
import {
    MONTH_APRIL, MONTH_AUGUST, MONTH_DECEMBER,
    MONTH_FEBRUARY,
    MONTH_JANUARY, MONTH_JULY,
    MONTH_JUNE,
    MONTH_MARCH,
    MONTH_MAY, MONTH_NOVEMBER, MONTH_OCTOBER, MONTH_SEPTEMBER
} from "~/Model/Constants/MonthsConstants";

const ru = new Map();

initRuMonthNames();

function initRuMonthNames()
{
    ru.set(MONTH_JANUARY, 'Январь');
    ru.set(MONTH_FEBRUARY, 'Февраль');
    ru.set(MONTH_MARCH, 'Март');
    ru.set(MONTH_APRIL, 'Апрель');
    ru.set(MONTH_MAY, 'Май');
    ru.set(MONTH_JUNE, 'Июнь');
    ru.set(MONTH_JULY, 'Июль');
    ru.set(MONTH_AUGUST, 'Август');
    ru.set(MONTH_SEPTEMBER, 'Сентябрь');
    ru.set(MONTH_OCTOBER, 'Октябрь');
    ru.set(MONTH_NOVEMBER, 'Ноябрь');
    ru.set(MONTH_DECEMBER, 'Декабрь');
}

export function getMonthName(month, locale= RU)
{
    let result;
    switch (locale)
    {
        case RU:
            result = ru.get(month);
            break;
        default:
            break;
    }
    if (result === undefined)
        throw new LocaleNotSupportedException(locale);
    return result;
}
