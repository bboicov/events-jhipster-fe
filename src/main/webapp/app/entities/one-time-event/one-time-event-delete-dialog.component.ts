import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOneTimeEvent } from 'app/shared/model/one-time-event.model';
import { OneTimeEventService } from './one-time-event.service';

@Component({
    selector: 'jhi-one-time-event-delete-dialog',
    templateUrl: './one-time-event-delete-dialog.component.html'
})
export class OneTimeEventDeleteDialogComponent {
    oneTimeEvent: IOneTimeEvent;

    constructor(
        protected oneTimeEventService: OneTimeEventService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.oneTimeEventService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'oneTimeEventListModification',
                content: 'Deleted an oneTimeEvent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-one-time-event-delete-popup',
    template: ''
})
export class OneTimeEventDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ oneTimeEvent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OneTimeEventDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.oneTimeEvent = oneTimeEvent;
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
