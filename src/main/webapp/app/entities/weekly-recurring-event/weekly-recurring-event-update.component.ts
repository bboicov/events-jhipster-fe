import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IWeeklyRecurringEvent } from 'app/shared/model/weekly-recurring-event.model';
import { WeeklyRecurringEventService } from './weekly-recurring-event.service';

@Component({
    selector: 'jhi-weekly-recurring-event-update',
    templateUrl: './weekly-recurring-event-update.component.html'
})
export class WeeklyRecurringEventUpdateComponent implements OnInit {
    weeklyRecurringEvent: IWeeklyRecurringEvent;
    isSaving: boolean;
    start: string;
    end: string;

    constructor(protected weeklyRecurringEventService: WeeklyRecurringEventService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ weeklyRecurringEvent }) => {
            this.weeklyRecurringEvent = weeklyRecurringEvent;
            this.start = this.weeklyRecurringEvent.start != null ? this.weeklyRecurringEvent.start.format(DATE_TIME_FORMAT) : null;
            this.end = this.weeklyRecurringEvent.end != null ? this.weeklyRecurringEvent.end.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.weeklyRecurringEvent.start = this.start != null ? moment(this.start, DATE_TIME_FORMAT) : null;
        this.weeklyRecurringEvent.end = this.end != null ? moment(this.end, DATE_TIME_FORMAT) : null;
        if (this.weeklyRecurringEvent.id !== undefined) {
            this.subscribeToSaveResponse(this.weeklyRecurringEventService.update(this.weeklyRecurringEvent));
        } else {
            this.subscribeToSaveResponse(this.weeklyRecurringEventService.create(this.weeklyRecurringEvent));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IWeeklyRecurringEvent>>) {
        result.subscribe(
            (res: HttpResponse<IWeeklyRecurringEvent>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
