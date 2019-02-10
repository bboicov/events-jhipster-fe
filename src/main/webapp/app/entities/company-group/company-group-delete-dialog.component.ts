import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompanyGroup } from 'app/shared/model/company-group.model';
import { CompanyGroupService } from './company-group.service';

@Component({
    selector: 'jhi-company-group-delete-dialog',
    templateUrl: './company-group-delete-dialog.component.html'
})
export class CompanyGroupDeleteDialogComponent {
    companyGroup: ICompanyGroup;

    constructor(
        protected companyGroupService: CompanyGroupService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.companyGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'companyGroupListModification',
                content: 'Deleted an companyGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-company-group-delete-popup',
    template: ''
})
export class CompanyGroupDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companyGroup }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CompanyGroupDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.companyGroup = companyGroup;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
