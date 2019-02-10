/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EventsTestModule } from '../../../test.module';
import { CompanyGroupDeleteDialogComponent } from 'app/entities/company-group/company-group-delete-dialog.component';
import { CompanyGroupService } from 'app/entities/company-group/company-group.service';

describe('Component Tests', () => {
    describe('CompanyGroup Management Delete Component', () => {
        let comp: CompanyGroupDeleteDialogComponent;
        let fixture: ComponentFixture<CompanyGroupDeleteDialogComponent>;
        let service: CompanyGroupService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsTestModule],
                declarations: [CompanyGroupDeleteDialogComponent]
            })
                .overrideTemplate(CompanyGroupDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyGroupDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyGroupService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
