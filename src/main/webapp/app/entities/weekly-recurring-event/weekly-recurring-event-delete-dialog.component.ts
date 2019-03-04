import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWeeklyRecurringEvent } from 'app/shared/model/weekly-recurring-event.model';
import { WeeklyRecurringEventService } from './weekly-recurring-event.service';

@Component({
    selector: 'jhi-weekly-recurring-event-delete-dialog',
    templateUrl: './weekly-recurring-event-delete-dialog.component.html'
})
export class WeeklyRecurringEventDeleteDialogComponent {
    weeklyRecurringEvent: IWeeklyRecurringEvent;

    constructor(
        protected weeklyRecurringEventService: WeeklyRecurringEventService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.weeklyRecurringEventService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'weeklyRecurringEventListModification',
                content: 'Deleted an weeklyRecurringEvent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-weekly-recurring-event-delete-popup',
    template: ''
})
export class WeeklyRecurringEventDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ weeklyRecurringEvent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(WeeklyRecurringEventDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.weeklyRecurringEvent = weeklyRecurringEvent;
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
