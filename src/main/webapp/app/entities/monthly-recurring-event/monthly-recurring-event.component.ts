import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMonthlyRecurringEvent } from 'app/shared/model/monthly-recurring-event.model';
import { AccountService } from 'app/core';
import { MonthlyRecurringEventService } from './monthly-recurring-event.service';

@Component({
    selector: 'jhi-monthly-recurring-event',
    templateUrl: './monthly-recurring-event.component.html'
})
export class MonthlyRecurringEventComponent implements OnInit, OnDestroy {
    monthlyRecurringEvents: IMonthlyRecurringEvent[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected monthlyRecurringEventService: MonthlyRecurringEventService,
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
            this.monthlyRecurringEventService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IMonthlyRecurringEvent[]>) => (this.monthlyRecurringEvents = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.monthlyRecurringEventService.query().subscribe(
            (res: HttpResponse<IMonthlyRecurringEvent[]>) => {
                this.monthlyRecurringEvents = res.body;
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
        this.registerChangeInMonthlyRecurringEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMonthlyRecurringEvent) {
        return item.id;
    }

    registerChangeInMonthlyRecurringEvents() {
        this.eventSubscriber = this.eventManager.subscribe('monthlyRecurringEventListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
