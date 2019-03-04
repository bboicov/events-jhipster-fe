/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EventsTestModule } from '../../../test.module';
import { MonthlyRecurringEventComponent } from 'app/entities/monthly-recurring-event/monthly-recurring-event.component';
import { MonthlyRecurringEventService } from 'app/entities/monthly-recurring-event/monthly-recurring-event.service';
import { MonthlyRecurringEvent } from 'app/shared/model/monthly-recurring-event.model';

describe('Component Tests', () => {
    describe('MonthlyRecurringEvent Management Component', () => {
        let comp: MonthlyRecurringEventComponent;
        let fixture: ComponentFixture<MonthlyRecurringEventComponent>;
        let service: MonthlyRecurringEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [MonthlyRecurringEventComponent],
                providers: []
            })
                .overrideTemplate(MonthlyRecurringEventComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MonthlyRecurringEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MonthlyRecurringEventService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MonthlyRecurringEvent(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.monthlyRecurringEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
