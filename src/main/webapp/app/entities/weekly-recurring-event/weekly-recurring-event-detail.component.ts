import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWeeklyRecurringEvent } from 'app/shared/model/weekly-recurring-event.model';

@Component({
    selector: 'jhi-weekly-recurring-event-detail',
    templateUrl: './weekly-recurring-event-detail.component.html'
})
export class WeeklyRecurringEventDetailComponent implements OnInit {
    weeklyRecurringEvent: IWeeklyRecurringEvent;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ weeklyRecurringEvent }) => {
            this.weeklyRecurringEvent = weeklyRecurringEvent;
        });
    }

    previousState() {
        window.history.back();
    }
}
