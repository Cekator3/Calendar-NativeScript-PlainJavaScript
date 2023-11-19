/**
 * Checks if month exists.
 * @param {number} month Number of month.
 * @return {boolean}
 */
export function isMonthExists(month)
{
    return (month >= MONTH_JANUARY) && (month <= MONTH_DECEMBER);
}
