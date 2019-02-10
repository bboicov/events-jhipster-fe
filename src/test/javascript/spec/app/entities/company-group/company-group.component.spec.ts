/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EventsTestModule } from '../../../test.module';
import { CompanyGroupComponent } from 'app/entities/company-group/company-group.component';
import { CompanyGroupService } from 'app/entities/company-group/company-group.service';
import { CompanyGroup } from 'app/shared/model/company-group.model';

describe('Component Tests', () => {
    describe('CompanyGroup Management Component', () => {
        let comp: CompanyGroupComponent;
        let fixture: ComponentFixture<CompanyGroupComponent>;
        let service: CompanyGroupService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [CompanyGroupComponent],
                providers: []
            })
                .overrideTemplate(CompanyGroupComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyGroupComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyGroupService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CompanyGroup(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.companyGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
