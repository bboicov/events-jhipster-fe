import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EventsCompanyModule } from './company/company.module';
import { EventsEventModule } from './event/event.module';
import { EventsConfigModule } from './config/config.module';
import { EventsCompanyGroupModule } from './company-group/company-group.module';
import { EventsAddressModule } from './address/address.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EventsCompanyModule,
        EventsEventModule,
        EventsConfigModule,
        EventsCompanyGroupModule,
        EventsAddressModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsEntityModule {}
