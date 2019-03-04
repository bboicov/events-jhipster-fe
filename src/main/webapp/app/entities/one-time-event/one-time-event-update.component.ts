import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOneTimeEvent } from 'app/shared/model/one-time-event.model';
import { OneTimeEventService } from './one-time-event.service';

@Component({
    selector: 'jhi-one-time-event-update',
    templateUrl: './one-time-event-update.component.html'
})
export class OneTimeEventUpdateComponent implements OnInit {
    oneTimeEvent: IOneTimeEvent;
    isSaving: boolean;
    when: string;

    constructor(protected oneTimeEventService: OneTimeEventService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ oneTimeEvent }) => {
            this.oneTimeEvent = oneTimeEvent;
            this.when = this.oneTimeEvent.when != null ? this.oneTimeEvent.when.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.oneTimeEvent.when = this.when != null ? moment(this.when, DATE_TIME_FORMAT) : null;
        if (this.oneTimeEvent.id !== undefined) {
            this.subscribeToSaveResponse(this.oneTimeEventService.update(this.oneTimeEvent));
        } else {
            this.subscribeToSaveResponse(this.oneTimeEventService.create(this.oneTimeEvent));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOneTimeEvent>>) {
        result.subscribe((res: HttpResponse<IOneTimeEvent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
