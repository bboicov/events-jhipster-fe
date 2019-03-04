/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EventsTestModule } from '../../../test.module';
import { WeeklyRecurringEventComponent } from 'app/entities/weekly-recurring-event/weekly-recurring-event.component';
import { WeeklyRecurringEventService } from 'app/entities/weekly-recurring-event/weekly-recurring-event.service';
import { WeeklyRecurringEvent } from 'app/shared/model/weekly-recurring-event.model';

describe('Component Tests', () => {
    describe('WeeklyRecurringEvent Management Component', () => {
        let comp: WeeklyRecurringEventComponent;
        let fixture: ComponentFixture<WeeklyRecurringEventComponent>;
        let service: WeeklyRecurringEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [WeeklyRecurringEventComponent],
                providers: []
            })
                .overrideTemplate(WeeklyRecurringEventComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WeeklyRecurringEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeeklyRecurringEventService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new WeeklyRecurringEvent(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.weeklyRecurringEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
