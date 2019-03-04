/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EventsTestModule } from '../../../test.module';
import { OneTimeEventUpdateComponent } from 'app/entities/one-time-event/one-time-event-update.component';
import { OneTimeEventService } from 'app/entities/one-time-event/one-time-event.service';
import { OneTimeEvent } from 'app/shared/model/one-time-event.model';

describe('Component Tests', () => {
    describe('OneTimeEvent Management Update Component', () => {
        let comp: OneTimeEventUpdateComponent;
        let fixture: ComponentFixture<OneTimeEventUpdateComponent>;
        let service: OneTimeEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [OneTimeEventUpdateComponent]
            })
                .overrideTemplate(OneTimeEventUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OneTimeEventUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OneTimeEventService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new OneTimeEvent(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.oneTimeEvent = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new OneTimeEvent();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.oneTimeEvent = entity;
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
