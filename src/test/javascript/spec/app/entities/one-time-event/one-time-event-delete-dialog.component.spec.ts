/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EventsTestModule } from '../../../test.module';
import { OneTimeEventDeleteDialogComponent } from 'app/entities/one-time-event/one-time-event-delete-dialog.component';
import { OneTimeEventService } from 'app/entities/one-time-event/one-time-event.service';

describe('Component Tests', () => {
    describe('OneTimeEvent Management Delete Component', () => {
        let comp: OneTimeEventDeleteDialogComponent;
        let fixture: ComponentFixture<OneTimeEventDeleteDialogComponent>;
        let service: OneTimeEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [OneTimeEventDeleteDialogComponent]
            })
                .overrideTemplate(OneTimeEventDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OneTimeEventDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OneTimeEventService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
