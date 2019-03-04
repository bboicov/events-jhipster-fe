/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EventsTestModule } from '../../../test.module';
import { OneTimeEventComponent } from 'app/entities/one-time-event/one-time-event.component';
import { OneTimeEventService } from 'app/entities/one-time-event/one-time-event.service';
import { OneTimeEvent } from 'app/shared/model/one-time-event.model';

describe('Component Tests', () => {
    describe('OneTimeEvent Management Component', () => {
        let comp: OneTimeEventComponent;
        let fixture: ComponentFixture<OneTimeEventComponent>;
        let service: OneTimeEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [OneTimeEventComponent],
                providers: []
            })
                .overrideTemplate(OneTimeEventComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OneTimeEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OneTimeEventService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OneTimeEvent(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.oneTimeEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
