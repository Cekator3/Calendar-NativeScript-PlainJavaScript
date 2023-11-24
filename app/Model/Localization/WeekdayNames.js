import {LocaleNotSupportedException} from "~/Model/Exceptions";
import {RU} from "~/Model/Constants/LocalesConstants";

const ru = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

/**
 * Returns the weekdays names based on the specified locale.
 *
 * @param {string} locale - The locale to use. Defaults to 'ru'.
 * @return {string[]}.
 */
export function getWeekdaysNames(locale= RU)
{
    switch (locale)
    {
        case RU:
            return ru;
        default:
            throw new LocaleNotSupportedException(locale);
    }
}
