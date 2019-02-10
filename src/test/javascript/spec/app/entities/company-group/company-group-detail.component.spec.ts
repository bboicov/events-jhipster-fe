/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EventsTestModule } from '../../../test.module';
import { CompanyGroupDetailComponent } from 'app/entities/company-group/company-group-detail.component';
import { CompanyGroup } from 'app/shared/model/company-group.model';

describe('Component Tests', () => {
    describe('CompanyGroup Management Detail Component', () => {
        let comp: CompanyGroupDetailComponent;
        let fixture: ComponentFixture<CompanyGroupDetailComponent>;
        const route = ({ data: of({ companyGroup: new CompanyGroup(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [CompanyGroupDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompanyGroupDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyGroupDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.companyGroup).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
