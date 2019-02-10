import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from './company.service';
import { IEvent } from 'app/shared/model/event.model';
import { EventService } from 'app/entities/event';
import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from 'app/entities/address';
import { ICompanyGroup } from 'app/shared/model/company-group.model';
import { CompanyGroupService } from 'app/entities/company-group';

@Component({
    selector: 'jhi-company-update',
    templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent implements OnInit {
    company: ICompany;
    isSaving: boolean;

    events: IEvent[];

    addresses: IAddress[];

    companygroups: ICompanyGroup[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected companyService: CompanyService,
        protected eventService: EventService,
        protected addressService: AddressService,
        protected companyGroupService: CompanyGroupService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
        this.eventService.query().subscribe(
            (res: HttpResponse<IEvent[]>) => {
                this.events = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.addressService.query({ filter: 'company-is-null' }).subscribe(
            (res: HttpResponse<IAddress[]>) => {
                if (!this.company.address || !this.company.address.id) {
                    this.addresses = res.body;
                } else {
                    this.addressService.find(this.company.address.id).subscribe(
                        (subRes: HttpResponse<IAddress>) => {
                            this.addresses = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.companyGroupService.query().subscribe(
            (res: HttpResponse<ICompanyGroup[]>) => {
                this.companygroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(this.companyService.create(this.company));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompany>>) {
        result.subscribe((res: HttpResponse<ICompany>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEventById(index: number, item: IEvent) {
        return item.id;
    }

    trackAddressById(index: number, item: IAddress) {
        return item.id;
    }

    trackCompanyGroupById(index: number, item: ICompanyGroup) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
