import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EventsSharedModule } from 'app/shared';
import {
    ConfigComponent,
    ConfigDetailComponent,
    ConfigUpdateComponent,
    ConfigDeletePopupComponent,
    ConfigDeleteDialogComponent,
    configRoute,
    configPopupRoute
} from './';

const ENTITY_STATES = [...configRoute, ...configPopupRoute];

@NgModule({
    imports: [EventsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ConfigComponent, ConfigDetailComponent, ConfigUpdateComponent, ConfigDeleteDialogComponent, ConfigDeletePopupComponent],
    entryComponents: [ConfigComponent, ConfigUpdateComponent, ConfigDeleteDialogComponent, ConfigDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsConfigModule {}
