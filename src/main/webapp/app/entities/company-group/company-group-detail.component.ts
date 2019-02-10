import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanyGroup } from 'app/shared/model/company-group.model';

@Component({
    selector: 'jhi-company-group-detail',
    templateUrl: './company-group-detail.component.html'
})
export class CompanyGroupDetailComponent implements OnInit {
    companyGroup: ICompanyGroup;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companyGroup }) => {
            this.companyGroup = companyGroup;
        });
    }

    previousState() {
        window.history.back();
    }
}
