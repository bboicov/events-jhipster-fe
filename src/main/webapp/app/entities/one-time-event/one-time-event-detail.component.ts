import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOneTimeEvent } from 'app/shared/model/one-time-event.model';

@Component({
    selector: 'jhi-one-time-event-detail',
    templateUrl: './one-time-event-detail.component.html'
})
export class OneTimeEventDetailComponent implements OnInit {
    oneTimeEvent: IOneTimeEvent;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ oneTimeEvent }) => {
            this.oneTimeEvent = oneTimeEvent;
        });
    }

    previousState() {
        window.history.back();
    }
}
