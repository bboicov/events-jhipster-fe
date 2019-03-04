import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EventsCompanyModule } from './company/company.module';
import { EventsEventModule } from './event/event.module';
import { EventsConfigModule } from './config/config.module';
import { EventsCompanyGroupModule } from './company-group/company-group.module';
import { EventsAddressModule } from './address/address.module';
import { EventsUserInfoModule } from './user-info/user-info.module';
import { EventsMonthlyRecurringEventModule } from './monthly-recurring-event/monthly-recurring-event.module';
import { EventsOneTimeEventModule } from './one-time-event/one-time-event.module';
import { EventsWeeklyRecurringEventModule } from './weekly-recurring-event/weekly-recurring-event.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EventsCompanyModule,
        EventsEventModule,
        EventsConfigModule,
        EventsCompanyGroupModule,
        EventsAddressModule,
        EventsUserInfoModule,
        EventsMonthlyRecurringEventModule,
        EventsOneTimeEventModule,
        EventsWeeklyRecurringEventModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsEntityModule {}
