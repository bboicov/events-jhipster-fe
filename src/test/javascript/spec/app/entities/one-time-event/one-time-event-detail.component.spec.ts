/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EventsTestModule } from '../../../test.module';
import { OneTimeEventDetailComponent } from 'app/entities/one-time-event/one-time-event-detail.component';
import { OneTimeEvent } from 'app/shared/model/one-time-event.model';

describe('Component Tests', () => {
    describe('OneTimeEvent Management Detail Component', () => {
        let comp: OneTimeEventDetailComponent;
        let fixture: ComponentFixture<OneTimeEventDetailComponent>;
        const route = ({ data: of({ oneTimeEvent: new OneTimeEvent(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [OneTimeEventDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OneTimeEventDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OneTimeEventDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.oneTimeEvent).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
