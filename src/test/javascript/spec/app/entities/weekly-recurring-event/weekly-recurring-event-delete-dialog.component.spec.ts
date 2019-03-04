/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EventsTestModule } from '../../../test.module';
import { WeeklyRecurringEventDeleteDialogComponent } from 'app/entities/weekly-recurring-event/weekly-recurring-event-delete-dialog.component';
import { WeeklyRecurringEventService } from 'app/entities/weekly-recurring-event/weekly-recurring-event.service';

describe('Component Tests', () => {
    describe('WeeklyRecurringEvent Management Delete Component', () => {
        let comp: WeeklyRecurringEventDeleteDialogComponent;
        let fixture: ComponentFixture<WeeklyRecurringEventDeleteDialogComponent>;
        let service: WeeklyRecurringEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [WeeklyRecurringEventDeleteDialogComponent]
            })
                .overrideTemplate(WeeklyRecurringEventDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WeeklyRecurringEventDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeeklyRecurringEventService);
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
