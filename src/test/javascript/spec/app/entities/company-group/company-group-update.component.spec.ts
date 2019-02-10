/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EventsTestModule } from '../../../test.module';
import { CompanyGroupUpdateComponent } from 'app/entities/company-group/company-group-update.component';
import { CompanyGroupService } from 'app/entities/company-group/company-group.service';
import { CompanyGroup } from 'app/shared/model/company-group.model';

describe('Component Tests', () => {
    describe('CompanyGroup Management Update Component', () => {
        let comp: CompanyGroupUpdateComponent;
        let fixture: ComponentFixture<CompanyGroupUpdateComponent>;
        let service: CompanyGroupService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [CompanyGroupUpdateComponent]
            })
                .overrideTemplate(CompanyGroupUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyGroupUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyGroupService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyGroup(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.companyGroup = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyGroup();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.companyGroup = entity;
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
