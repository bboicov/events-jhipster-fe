/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EventsTestModule } from '../../../test.module';
import { WeeklyRecurringEventUpdateComponent } from 'app/entities/weekly-recurring-event/weekly-recurring-event-update.component';
import { WeeklyRecurringEventService } from 'app/entities/weekly-recurring-event/weekly-recurring-event.service';
import { WeeklyRecurringEvent } from 'app/shared/model/weekly-recurring-event.model';

describe('Component Tests', () => {
    describe('WeeklyRecurringEvent Management Update Component', () => {
        let comp: WeeklyRecurringEventUpdateComponent;
        let fixture: ComponentFixture<WeeklyRecurringEventUpdateComponent>;
        let service: WeeklyRecurringEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [WeeklyRecurringEventUpdateComponent]
            })
                .overrideTemplate(WeeklyRecurringEventUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WeeklyRecurringEventUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeeklyRecurringEventService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new WeeklyRecurringEvent(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.weeklyRecurringEvent = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new WeeklyRecurringEvent();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.weeklyRecurringEvent = entity;
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
