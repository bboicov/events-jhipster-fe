import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMonthlyRecurringEvent } from 'app/shared/model/monthly-recurring-event.model';
import { MonthlyRecurringEventService } from './monthly-recurring-event.service';

@Component({
    selector: 'jhi-monthly-recurring-event-delete-dialog',
    templateUrl: './monthly-recurring-event-delete-dialog.component.html'
})
export class MonthlyRecurringEventDeleteDialogComponent {
    monthlyRecurringEvent: IMonthlyRecurringEvent;

    constructor(
        protected monthlyRecurringEventService: MonthlyRecurringEventService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.monthlyRecurringEventService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'monthlyRecurringEventListModification',
                content: 'Deleted an monthlyRecurringEvent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-monthly-recurring-event-delete-popup',
    template: ''
})
export class MonthlyRecurringEventDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ monthlyRecurringEvent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MonthlyRecurringEventDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.monthlyRecurringEvent = monthlyRecurringEvent;
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
