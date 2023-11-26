/**
 * @fileOverview
 * A subsystem for creating a UI element that can be placed directly in the calendar.
 */
import {Label} from "@nativescript/core";

/**
 * Creates a calendar item that can be used for displaying the calendar.
 * @param {string} text - The text that will be displayed in that calendar item.
 * @param {string[]} cssClasses - An array of CSS classes to be applied to the calendar item.
 * @returns {Label}
 */
export function createCalendarItem(text, cssClasses)
{
    let cell = new Label();
    cell.text = text;
    for (let cssClass of cssClasses)
        cell.cssClasses.add(cssClass);
    return cell;
}
