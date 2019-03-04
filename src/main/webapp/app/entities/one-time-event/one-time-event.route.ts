import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OneTimeEvent } from 'app/shared/model/one-time-event.model';
import { OneTimeEventService } from './one-time-event.service';
import { OneTimeEventComponent } from './one-time-event.component';
import { OneTimeEventDetailComponent } from './one-time-event-detail.component';
import { OneTimeEventUpdateComponent } from './one-time-event-update.component';
import { OneTimeEventDeletePopupComponent } from './one-time-event-delete-dialog.component';
import { IOneTimeEvent } from 'app/shared/model/one-time-event.model';

@Injectable({ providedIn: 'root' })
export class OneTimeEventResolve implements Resolve<IOneTimeEvent> {
    constructor(private service: OneTimeEventService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OneTimeEvent> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<OneTimeEvent>) => response.ok),
                map((oneTimeEvent: HttpResponse<OneTimeEvent>) => oneTimeEvent.body)
            );
        }
        return of(new OneTimeEvent());
    }
}

export const oneTimeEventRoute: Routes = [
    {
        path: 'one-time-event',
        component: OneTimeEventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.oneTimeEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'one-time-event/:id/view',
        component: OneTimeEventDetailComponent,
        resolve: {
            oneTimeEvent: OneTimeEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.oneTimeEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'one-time-event/new',
        component: OneTimeEventUpdateComponent,
        resolve: {
            oneTimeEvent: OneTimeEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.oneTimeEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'one-time-event/:id/edit',
        component: OneTimeEventUpdateComponent,
        resolve: {
            oneTimeEvent: OneTimeEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.oneTimeEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const oneTimeEventPopupRoute: Routes = [
    {
        path: 'one-time-event/:id/delete',
        component: OneTimeEventDeletePopupComponent,
        resolve: {
            oneTimeEvent: OneTimeEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.oneTimeEvent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
