import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOneTimeEvent } from 'app/shared/model/one-time-event.model';
import { AccountService } from 'app/core';
import { OneTimeEventService } from './one-time-event.service';

@Component({
    selector: 'jhi-one-time-event',
    templateUrl: './one-time-event.component.html'
})
export class OneTimeEventComponent implements OnInit, OnDestroy {
    oneTimeEvents: IOneTimeEvent[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected oneTimeEventService: OneTimeEventService,
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
            this.oneTimeEventService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IOneTimeEvent[]>) => (this.oneTimeEvents = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.oneTimeEventService.query().subscribe(
            (res: HttpResponse<IOneTimeEvent[]>) => {
                this.oneTimeEvents = res.body;
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
        this.registerChangeInOneTimeEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOneTimeEvent) {
        return item.id;
    }

    registerChangeInOneTimeEvents() {
        this.eventSubscriber = this.eventManager.subscribe('oneTimeEventListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
