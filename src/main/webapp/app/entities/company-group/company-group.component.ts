import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompanyGroup } from 'app/shared/model/company-group.model';
import { AccountService } from 'app/core';
import { CompanyGroupService } from './company-group.service';

@Component({
    selector: 'jhi-company-group',
    templateUrl: './company-group.component.html'
})
export class CompanyGroupComponent implements OnInit, OnDestroy {
    companyGroups: ICompanyGroup[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected companyGroupService: CompanyGroupService,
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
            this.companyGroupService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ICompanyGroup[]>) => (this.companyGroups = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.companyGroupService.query().subscribe(
            (res: HttpResponse<ICompanyGroup[]>) => {
                this.companyGroups = res.body;
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
        this.registerChangeInCompanyGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompanyGroup) {
        return item.id;
    }

    registerChangeInCompanyGroups() {
        this.eventSubscriber = this.eventManager.subscribe('companyGroupListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
