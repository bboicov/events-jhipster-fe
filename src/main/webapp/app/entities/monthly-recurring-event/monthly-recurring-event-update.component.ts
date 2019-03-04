import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMonthlyRecurringEvent } from 'app/shared/model/monthly-recurring-event.model';
import { MonthlyRecurringEventService } from './monthly-recurring-event.service';

@Component({
    selector: 'jhi-monthly-recurring-event-update',
    templateUrl: './monthly-recurring-event-update.component.html'
})
export class MonthlyRecurringEventUpdateComponent implements OnInit {
    monthlyRecurringEvent: IMonthlyRecurringEvent;
    isSaving: boolean;
    start: string;
    end: string;

    constructor(protected monthlyRecurringEventService: MonthlyRecurringEventService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ monthlyRecurringEvent }) => {
            this.monthlyRecurringEvent = monthlyRecurringEvent;
            this.start = this.monthlyRecurringEvent.start != null ? this.monthlyRecurringEvent.start.format(DATE_TIME_FORMAT) : null;
            this.end = this.monthlyRecurringEvent.end != null ? this.monthlyRecurringEvent.end.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.monthlyRecurringEvent.start = this.start != null ? moment(this.start, DATE_TIME_FORMAT) : null;
        this.monthlyRecurringEvent.end = this.end != null ? moment(this.end, DATE_TIME_FORMAT) : null;
        if (this.monthlyRecurringEvent.id !== undefined) {
            this.subscribeToSaveResponse(this.monthlyRecurringEventService.update(this.monthlyRecurringEvent));
        } else {
            this.subscribeToSaveResponse(this.monthlyRecurringEventService.create(this.monthlyRecurringEvent));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMonthlyRecurringEvent>>) {
        result.subscribe(
            (res: HttpResponse<IMonthlyRecurringEvent>) => this.onSaveSuccess(),
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
