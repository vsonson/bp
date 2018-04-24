/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BalancepositionTestModule } from '../../../test.module';
import { QuoteOfTheDayDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/quote-of-the-day/quote-of-the-day-delete-dialog.component';
import { QuoteOfTheDayService } from '../../../../../../main/webapp/app/entities/quote-of-the-day/quote-of-the-day.service';

describe('Component Tests', () => {

    describe('QuoteOfTheDay Management Delete Component', () => {
        let comp: QuoteOfTheDayDeleteDialogComponent;
        let fixture: ComponentFixture<QuoteOfTheDayDeleteDialogComponent>;
        let service: QuoteOfTheDayService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [QuoteOfTheDayDeleteDialogComponent],
                providers: [
                    QuoteOfTheDayService
                ]
            })
            .overrideTemplate(QuoteOfTheDayDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuoteOfTheDayDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuoteOfTheDayService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
