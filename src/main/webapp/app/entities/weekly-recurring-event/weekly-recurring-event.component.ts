import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWeeklyRecurringEvent } from 'app/shared/model/weekly-recurring-event.model';
import { AccountService } from 'app/core';
import { WeeklyRecurringEventService } from './weekly-recurring-event.service';

@Component({
    selector: 'jhi-weekly-recurring-event',
    templateUrl: './weekly-recurring-event.component.html'
})
export class WeeklyRecurringEventComponent implements OnInit, OnDestroy {
    weeklyRecurringEvents: IWeeklyRecurringEvent[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected weeklyRecurringEventService: WeeklyRecurringEventService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.weeklyRecurringEventService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IWeeklyRecurringEvent[]>) => (this.weeklyRecurringEvents = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.weeklyRecurringEventService.query().subscribe(
            (res: HttpResponse<IWeeklyRecurringEvent[]>) => {
                this.weeklyRecurringEvents = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWeeklyRecurringEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWeeklyRecurringEvent) {
        return item.id;
    }

    registerChangeInWeeklyRecurringEvents() {
        this.eventSubscriber = this.eventManager.subscribe('weeklyRecurringEventListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
