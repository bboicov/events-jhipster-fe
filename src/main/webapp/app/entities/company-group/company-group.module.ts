import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EventsSharedModule } from 'app/shared';
import {
    CompanyGroupComponent,
    CompanyGroupDetailComponent,
    CompanyGroupUpdateComponent,
    CompanyGroupDeletePopupComponent,
    CompanyGroupDeleteDialogComponent,
    companyGroupRoute,
    companyGroupPopupRoute
} from './';

const ENTITY_STATES = [...companyGroupRoute, ...companyGroupPopupRoute];

@NgModule({
    imports: [EventsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanyGroupComponent,
        CompanyGroupDetailComponent,
        CompanyGroupUpdateComponent,
        CompanyGroupDeleteDialogComponent,
        CompanyGroupDeletePopupComponent
    ],
    entryComponents: [
        CompanyGroupComponent,
        CompanyGroupUpdateComponent,
        CompanyGroupDeleteDialogComponent,
        CompanyGroupDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsCompanyGroupModule {}
