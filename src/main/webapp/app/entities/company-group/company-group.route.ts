import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CompanyGroup } from 'app/shared/model/company-group.model';
import { CompanyGroupService } from './company-group.service';
import { CompanyGroupComponent } from './company-group.component';
import { CompanyGroupDetailComponent } from './company-group-detail.component';
import { CompanyGroupUpdateComponent } from './company-group-update.component';
import { CompanyGroupDeletePopupComponent } from './company-group-delete-dialog.component';
import { ICompanyGroup } from 'app/shared/model/company-group.model';

@Injectable({ providedIn: 'root' })
export class CompanyGroupResolve implements Resolve<ICompanyGroup> {
    constructor(private service: CompanyGroupService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompanyGroup> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CompanyGroup>) => response.ok),
                map((companyGroup: HttpResponse<CompanyGroup>) => companyGroup.body)
            );
        }
        return of(new CompanyGroup());
    }
}

export const companyGroupRoute: Routes = [
    {
        path: 'company-group',
        component: CompanyGroupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.companyGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-group/:id/view',
        component: CompanyGroupDetailComponent,
        resolve: {
            companyGroup: CompanyGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.companyGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-group/new',
        component: CompanyGroupUpdateComponent,
        resolve: {
            companyGroup: CompanyGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.companyGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-group/:id/edit',
        component: CompanyGroupUpdateComponent,
        resolve: {
            companyGroup: CompanyGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.companyGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companyGroupPopupRoute: Routes = [
    {
        path: 'company-group/:id/delete',
        component: CompanyGroupDeletePopupComponent,
        resolve: {
            companyGroup: CompanyGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.companyGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
