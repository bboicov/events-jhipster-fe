import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICompanyGroup } from 'app/shared/model/company-group.model';
import { CompanyGroupService } from './company-group.service';
import { IUserInfo } from 'app/shared/model/user-info.model';
import { UserInfoService } from 'app/entities/user-info';

@Component({
    selector: 'jhi-company-group-update',
    templateUrl: './company-group-update.component.html'
})
export class CompanyGroupUpdateComponent implements OnInit {
    companyGroup: ICompanyGroup;
    isSaving: boolean;

    userinfos: IUserInfo[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected companyGroupService: CompanyGroupService,
        protected userInfoService: UserInfoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ companyGroup }) => {
            this.companyGroup = companyGroup;
        });
        this.userInfoService.query().subscribe(
            (res: HttpResponse<IUserInfo[]>) => {
                this.userinfos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.companyGroup.id !== undefined) {
            this.subscribeToSaveResponse(this.companyGroupService.update(this.companyGroup));
        } else {
            this.subscribeToSaveResponse(this.companyGroupService.create(this.companyGroup));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompanyGroup>>) {
        result.subscribe((res: HttpResponse<ICompanyGroup>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserInfoById(index: number, item: IUserInfo) {
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
