import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOneTimeEvent } from 'app/shared/model/one-time-event.model';

type EntityResponseType = HttpResponse<IOneTimeEvent>;
type EntityArrayResponseType = HttpResponse<IOneTimeEvent[]>;

@Injectable({ providedIn: 'root' })
export class OneTimeEventService {
    public resourceUrl = SERVER_API_URL + 'api/one-time-events';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/one-time-events';

    constructor(protected http: HttpClient) {}

    create(oneTimeEvent: IOneTimeEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(oneTimeEvent);
        return this.http
            .post<IOneTimeEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(oneTimeEvent: IOneTimeEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(oneTimeEvent);
        return this.http
            .put<IOneTimeEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOneTimeEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOneTimeEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOneTimeEvent[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(oneTimeEvent: IOneTimeEvent): IOneTimeEvent {
        const copy: IOneTimeEvent = Object.assign({}, oneTimeEvent, {
            when: oneTimeEvent.when != null && oneTimeEvent.when.isValid() ? oneTimeEvent.when.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.when = res.body.when != null ? moment(res.body.when) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((oneTimeEvent: IOneTimeEvent) => {
                oneTimeEvent.when = oneTimeEvent.when != null ? moment(oneTimeEvent.when) : null;
            });
        }
        return res;
    }
}
