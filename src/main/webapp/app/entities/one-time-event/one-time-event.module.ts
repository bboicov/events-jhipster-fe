import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EventsSharedModule } from 'app/shared';
import {
    OneTimeEventComponent,
    OneTimeEventDetailComponent,
    OneTimeEventUpdateComponent,
    OneTimeEventDeletePopupComponent,
    OneTimeEventDeleteDialogComponent,
    oneTimeEventRoute,
    oneTimeEventPopupRoute
} from './';

const ENTITY_STATES = [...oneTimeEventRoute, ...oneTimeEventPopupRoute];

@NgModule({
    imports: [EventsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OneTimeEventComponent,
        OneTimeEventDetailComponent,
        OneTimeEventUpdateComponent,
        OneTimeEventDeleteDialogComponent,
        OneTimeEventDeletePopupComponent
    ],
    entryComponents: [
        OneTimeEventComponent,
        OneTimeEventUpdateComponent,
        OneTimeEventDeleteDialogComponent,
        OneTimeEventDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsOneTimeEventModule {}
