/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EventsTestModule } from '../../../test.module';
import { WeeklyRecurringEventDetailComponent } from 'app/entities/weekly-recurring-event/weekly-recurring-event-detail.component';
import { WeeklyRecurringEvent } from 'app/shared/model/weekly-recurring-event.model';

describe('Component Tests', () => {
    describe('WeeklyRecurringEvent Management Detail Component', () => {
        let comp: WeeklyRecurringEventDetailComponent;
        let fixture: ComponentFixture<WeeklyRecurringEventDetailComponent>;
        const route = ({ data: of({ weeklyRecurringEvent: new WeeklyRecurringEvent(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [WeeklyRecurringEventDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WeeklyRecurringEventDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WeeklyRecurringEventDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.weeklyRecurringEvent).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
