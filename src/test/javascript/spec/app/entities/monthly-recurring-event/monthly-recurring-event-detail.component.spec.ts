/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EventsTestModule } from '../../../test.module';
import { MonthlyRecurringEventDetailComponent } from 'app/entities/monthly-recurring-event/monthly-recurring-event-detail.component';
import { MonthlyRecurringEvent } from 'app/shared/model/monthly-recurring-event.model';

describe('Component Tests', () => {
    describe('MonthlyRecurringEvent Management Detail Component', () => {
        let comp: MonthlyRecurringEventDetailComponent;
        let fixture: ComponentFixture<MonthlyRecurringEventDetailComponent>;
        const route = ({ data: of({ monthlyRecurringEvent: new MonthlyRecurringEvent(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [MonthlyRecurringEventDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MonthlyRecurringEventDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MonthlyRecurringEventDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.monthlyRecurringEvent).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
