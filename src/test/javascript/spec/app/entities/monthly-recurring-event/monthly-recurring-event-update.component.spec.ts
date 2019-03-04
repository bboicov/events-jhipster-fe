/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EventsTestModule } from '../../../test.module';
import { MonthlyRecurringEventUpdateComponent } from 'app/entities/monthly-recurring-event/monthly-recurring-event-update.component';
import { MonthlyRecurringEventService } from 'app/entities/monthly-recurring-event/monthly-recurring-event.service';
import { MonthlyRecurringEvent } from 'app/shared/model/monthly-recurring-event.model';

describe('Component Tests', () => {
    describe('MonthlyRecurringEvent Management Update Component', () => {
        let comp: MonthlyRecurringEventUpdateComponent;
        let fixture: ComponentFixture<MonthlyRecurringEventUpdateComponent>;
        let service: MonthlyRecurringEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [MonthlyRecurringEventUpdateComponent]
            })
                .overrideTemplate(MonthlyRecurringEventUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MonthlyRecurringEventUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MonthlyRecurringEventService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new MonthlyRecurringEvent(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.monthlyRecurringEvent = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new MonthlyRecurringEvent();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.monthlyRecurringEvent = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
