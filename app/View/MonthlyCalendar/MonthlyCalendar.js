import { createViewModel } from './MonthlyCalendar-view-model';

export function onNavigatingTo(args)
{
    const page = args.object;
    page.bindingContext = createViewModel(page);
}
