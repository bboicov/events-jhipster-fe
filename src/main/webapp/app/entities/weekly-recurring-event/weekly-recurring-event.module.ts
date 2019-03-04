import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EventsSharedModule } from 'app/shared';
import {
    WeeklyRecurringEventComponent,
    WeeklyRecurringEventDetailComponent,
    WeeklyRecurringEventUpdateComponent,
    WeeklyRecurringEventDeletePopupComponent,
    WeeklyRecurringEventDeleteDialogComponent,
    weeklyRecurringEventRoute,
    weeklyRecurringEventPopupRoute
} from './';

const ENTITY_STATES = [...weeklyRecurringEventRoute, ...weeklyRecurringEventPopupRoute];

@NgModule({
    imports: [EventsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WeeklyRecurringEventComponent,
        WeeklyRecurringEventDetailComponent,
        WeeklyRecurringEventUpdateComponent,
        WeeklyRecurringEventDeleteDialogComponent,
        WeeklyRecurringEventDeletePopupComponent
    ],
    entryComponents: [
        WeeklyRecurringEventComponent,
        WeeklyRecurringEventUpdateComponent,
        WeeklyRecurringEventDeleteDialogComponent,
        WeeklyRecurringEventDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsWeeklyRecurringEventModule {}
