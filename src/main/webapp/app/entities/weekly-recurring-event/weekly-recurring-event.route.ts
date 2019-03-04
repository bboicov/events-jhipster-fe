import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WeeklyRecurringEvent } from 'app/shared/model/weekly-recurring-event.model';
import { WeeklyRecurringEventService } from './weekly-recurring-event.service';
import { WeeklyRecurringEventComponent } from './weekly-recurring-event.component';
import { WeeklyRecurringEventDetailComponent } from './weekly-recurring-event-detail.component';
import { WeeklyRecurringEventUpdateComponent } from './weekly-recurring-event-update.component';
import { WeeklyRecurringEventDeletePopupComponent } from './weekly-recurring-event-delete-dialog.component';
import { IWeeklyRecurringEvent } from 'app/shared/model/weekly-recurring-event.model';

@Injectable({ providedIn: 'root' })
export class WeeklyRecurringEventResolve implements Resolve<IWeeklyRecurringEvent> {
    constructor(private service: WeeklyRecurringEventService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WeeklyRecurringEvent> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<WeeklyRecurringEvent>) => response.ok),
                map((weeklyRecurringEvent: HttpResponse<WeeklyRecurringEvent>) => weeklyRecurringEvent.body)
            );
        }
        return of(new WeeklyRecurringEvent());
    }
}

export const weeklyRecurringEventRoute: Routes = [
    {
        path: 'weekly-recurring-event',
        component: WeeklyRecurringEventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.weeklyRecurringEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'weekly-recurring-event/:id/view',
        component: WeeklyRecurringEventDetailComponent,
        resolve: {
            weeklyRecurringEvent: WeeklyRecurringEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.weeklyRecurringEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'weekly-recurring-event/new',
        component: WeeklyRecurringEventUpdateComponent,
        resolve: {
            weeklyRecurringEvent: WeeklyRecurringEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.weeklyRecurringEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'weekly-recurring-event/:id/edit',
        component: WeeklyRecurringEventUpdateComponent,
        resolve: {
            weeklyRecurringEvent: WeeklyRecurringEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.weeklyRecurringEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const weeklyRecurringEventPopupRoute: Routes = [
    {
        path: 'weekly-recurring-event/:id/delete',
        component: WeeklyRecurringEventDeletePopupComponent,
        resolve: {
            weeklyRecurringEvent: WeeklyRecurringEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.weeklyRecurringEvent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
