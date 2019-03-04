import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EventsSharedModule } from 'app/shared';
import {
    MonthlyRecurringEventComponent,
    MonthlyRecurringEventDetailComponent,
    MonthlyRecurringEventUpdateComponent,
    MonthlyRecurringEventDeletePopupComponent,
    MonthlyRecurringEventDeleteDialogComponent,
    monthlyRecurringEventRoute,
    monthlyRecurringEventPopupRoute
} from './';

const ENTITY_STATES = [...monthlyRecurringEventRoute, ...monthlyRecurringEventPopupRoute];

@NgModule({
    imports: [EventsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MonthlyRecurringEventComponent,
        MonthlyRecurringEventDetailComponent,
        MonthlyRecurringEventUpdateComponent,
        MonthlyRecurringEventDeleteDialogComponent,
        MonthlyRecurringEventDeletePopupComponent
    ],
    entryComponents: [
        MonthlyRecurringEventComponent,
        MonthlyRecurringEventUpdateComponent,
        MonthlyRecurringEventDeleteDialogComponent,
        MonthlyRecurringEventDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsMonthlyRecurringEventModule {}
