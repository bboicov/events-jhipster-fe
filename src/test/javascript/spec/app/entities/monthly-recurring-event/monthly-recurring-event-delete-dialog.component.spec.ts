/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EventsTestModule } from '../../../test.module';
import { MonthlyRecurringEventDeleteDialogComponent } from 'app/entities/monthly-recurring-event/monthly-recurring-event-delete-dialog.component';
import { MonthlyRecurringEventService } from 'app/entities/monthly-recurring-event/monthly-recurring-event.service';

describe('Component Tests', () => {
    describe('MonthlyRecurringEvent Management Delete Component', () => {
        let comp: MonthlyRecurringEventDeleteDialogComponent;
        let fixture: ComponentFixture<MonthlyRecurringEventDeleteDialogComponent>;
        let service: MonthlyRecurringEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [MonthlyRecurringEventDeleteDialogComponent]
            })
                .overrideTemplate(MonthlyRecurringEventDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MonthlyRecurringEventDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MonthlyRecurringEventService);
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
