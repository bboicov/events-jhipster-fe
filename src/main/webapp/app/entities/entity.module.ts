import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EventsCompanyModule } from './company/company.module';
import { EventsEventModule } from './event/event.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EventsCompanyModule,
        EventsEventModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsEntityModule {}
