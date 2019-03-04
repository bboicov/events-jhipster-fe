import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMonthlyRecurringEvent } from 'app/shared/model/monthly-recurring-event.model';

@Component({
    selector: 'jhi-monthly-recurring-event-detail',
    templateUrl: './monthly-recurring-event-detail.component.html'
})
export class MonthlyRecurringEventDetailComponent implements OnInit {
    monthlyRecurringEvent: IMonthlyRecurringEvent;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ monthlyRecurringEvent }) => {
            this.monthlyRecurringEvent = monthlyRecurringEvent;
        });
    }

    previousState() {
        window.history.back();
    }
}
