import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompanyGroup } from 'app/shared/model/company-group.model';

type EntityResponseType = HttpResponse<ICompanyGroup>;
type EntityArrayResponseType = HttpResponse<ICompanyGroup[]>;

@Injectable({ providedIn: 'root' })
export class CompanyGroupService {
    public resourceUrl = SERVER_API_URL + 'api/company-groups';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/company-groups';

    constructor(protected http: HttpClient) {}

    create(companyGroup: ICompanyGroup): Observable<EntityResponseType> {
        return this.http.post<ICompanyGroup>(this.resourceUrl, companyGroup, { observe: 'response' });
    }

    update(companyGroup: ICompanyGroup): Observable<EntityResponseType> {
        return this.http.put<ICompanyGroup>(this.resourceUrl, companyGroup, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompanyGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompanyGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompanyGroup[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
