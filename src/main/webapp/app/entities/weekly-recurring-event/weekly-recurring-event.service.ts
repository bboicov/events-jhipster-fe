import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWeeklyRecurringEvent } from 'app/shared/model/weekly-recurring-event.model';

type EntityResponseType = HttpResponse<IWeeklyRecurringEvent>;
type EntityArrayResponseType = HttpResponse<IWeeklyRecurringEvent[]>;

@Injectable({ providedIn: 'root' })
export class WeeklyRecurringEventService {
    public resourceUrl = SERVER_API_URL + 'api/weekly-recurring-events';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/weekly-recurring-events';

    constructor(protected http: HttpClient) {}

    create(weeklyRecurringEvent: IWeeklyRecurringEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(weeklyRecurringEvent);
        return this.http
            .post<IWeeklyRecurringEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(weeklyRecurringEvent: IWeeklyRecurringEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(weeklyRecurringEvent);
        return this.http
            .put<IWeeklyRecurringEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IWeeklyRecurringEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IWeeklyRecurringEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IWeeklyRecurringEvent[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(weeklyRecurringEvent: IWeeklyRecurringEvent): IWeeklyRecurringEvent {
        const copy: IWeeklyRecurringEvent = Object.assign({}, weeklyRecurringEvent, {
            start: weeklyRecurringEvent.start != null && weeklyRecurringEvent.start.isValid() ? weeklyRecurringEvent.start.toJSON() : null,
            end: weeklyRecurringEvent.end != null && weeklyRecurringEvent.end.isValid() ? weeklyRecurringEvent.end.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.start = res.body.start != null ? moment(res.body.start) : null;
            res.body.end = res.body.end != null ? moment(res.body.end) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((weeklyRecurringEvent: IWeeklyRecurringEvent) => {
                weeklyRecurringEvent.start = weeklyRecurringEvent.start != null ? moment(weeklyRecurringEvent.start) : null;
                weeklyRecurringEvent.end = weeklyRecurringEvent.end != null ? moment(weeklyRecurringEvent.end) : null;
            });
        }
        return res;
    }
}
