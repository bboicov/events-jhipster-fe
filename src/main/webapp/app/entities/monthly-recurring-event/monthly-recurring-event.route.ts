import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MonthlyRecurringEvent } from 'app/shared/model/monthly-recurring-event.model';
import { MonthlyRecurringEventService } from './monthly-recurring-event.service';
import { MonthlyRecurringEventComponent } from './monthly-recurring-event.component';
import { MonthlyRecurringEventDetailComponent } from './monthly-recurring-event-detail.component';
import { MonthlyRecurringEventUpdateComponent } from './monthly-recurring-event-update.component';
import { MonthlyRecurringEventDeletePopupComponent } from './monthly-recurring-event-delete-dialog.component';
import { IMonthlyRecurringEvent } from 'app/shared/model/monthly-recurring-event.model';

@Injectable({ providedIn: 'root' })
export class MonthlyRecurringEventResolve implements Resolve<IMonthlyRecurringEvent> {
    constructor(private service: MonthlyRecurringEventService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MonthlyRecurringEvent> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MonthlyRecurringEvent>) => response.ok),
                map((monthlyRecurringEvent: HttpResponse<MonthlyRecurringEvent>) => monthlyRecurringEvent.body)
            );
        }
        return of(new MonthlyRecurringEvent());
    }
}

export const monthlyRecurringEventRoute: Routes = [
    {
        path: 'monthly-recurring-event',
        component: MonthlyRecurringEventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.monthlyRecurringEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'monthly-recurring-event/:id/view',
        component: MonthlyRecurringEventDetailComponent,
        resolve: {
            monthlyRecurringEvent: MonthlyRecurringEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.monthlyRecurringEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'monthly-recurring-event/new',
        component: MonthlyRecurringEventUpdateComponent,
        resolve: {
            monthlyRecurringEvent: MonthlyRecurringEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.monthlyRecurringEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'monthly-recurring-event/:id/edit',
        component: MonthlyRecurringEventUpdateComponent,
        resolve: {
            monthlyRecurringEvent: MonthlyRecurringEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.monthlyRecurringEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const monthlyRecurringEventPopupRoute: Routes = [
    {
        path: 'monthly-recurring-event/:id/delete',
        component: MonthlyRecurringEventDeletePopupComponent,
        resolve: {
            monthlyRecurringEvent: MonthlyRecurringEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.monthlyRecurringEvent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
