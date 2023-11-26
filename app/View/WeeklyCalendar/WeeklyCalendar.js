import { createViewModel } from './WeeklyCalendar-view-model';

export function onNavigatingTo(args)
{
    const page = args.object;
    page.addCssFile('~/View/header-date-picker.css');
    page.bindingContext = createViewModel(page);
}
