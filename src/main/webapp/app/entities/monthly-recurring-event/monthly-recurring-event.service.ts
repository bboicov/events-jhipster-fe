import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMonthlyRecurringEvent } from 'app/shared/model/monthly-recurring-event.model';

type EntityResponseType = HttpResponse<IMonthlyRecurringEvent>;
type EntityArrayResponseType = HttpResponse<IMonthlyRecurringEvent[]>;

@Injectable({ providedIn: 'root' })
export class MonthlyRecurringEventService {
    public resourceUrl = SERVER_API_URL + 'api/monthly-recurring-events';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/monthly-recurring-events';

    constructor(protected http: HttpClient) {}

    create(monthlyRecurringEvent: IMonthlyRecurringEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(monthlyRecurringEvent);
        return this.http
            .post<IMonthlyRecurringEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(monthlyRecurringEvent: IMonthlyRecurringEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(monthlyRecurringEvent);
        return this.http
            .put<IMonthlyRecurringEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMonthlyRecurringEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMonthlyRecurringEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMonthlyRecurringEvent[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(monthlyRecurringEvent: IMonthlyRecurringEvent): IMonthlyRecurringEvent {
        const copy: IMonthlyRecurringEvent = Object.assign({}, monthlyRecurringEvent, {
            start:
                monthlyRecurringEvent.start != null && monthlyRecurringEvent.start.isValid() ? monthlyRecurringEvent.start.toJSON() : null,
            end: monthlyRecurringEvent.end != null && monthlyRecurringEvent.end.isValid() ? monthlyRecurringEvent.end.toJSON() : null
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
            res.body.forEach((monthlyRecurringEvent: IMonthlyRecurringEvent) => {
                monthlyRecurringEvent.start = monthlyRecurringEvent.start != null ? moment(monthlyRecurringEvent.start) : null;
                monthlyRecurringEvent.end = monthlyRecurringEvent.end != null ? moment(monthlyRecurringEvent.end) : null;
            });
        }
        return res;
    }
}
