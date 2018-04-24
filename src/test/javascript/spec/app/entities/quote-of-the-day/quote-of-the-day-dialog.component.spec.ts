/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BalancepositionTestModule } from '../../../test.module';
import { QuoteOfTheDayDialogComponent } from '../../../../../../main/webapp/app/entities/quote-of-the-day/quote-of-the-day-dialog.component';
import { QuoteOfTheDayService } from '../../../../../../main/webapp/app/entities/quote-of-the-day/quote-of-the-day.service';
import { QuoteOfTheDay } from '../../../../../../main/webapp/app/entities/quote-of-the-day/quote-of-the-day.model';
import { UserInfoService } from '../../../../../../main/webapp/app/entities/user-info';

describe('Component Tests', () => {

    describe('QuoteOfTheDay Management Dialog Component', () => {
        let comp: QuoteOfTheDayDialogComponent;
        let fixture: ComponentFixture<QuoteOfTheDayDialogComponent>;
        let service: QuoteOfTheDayService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [QuoteOfTheDayDialogComponent],
                providers: [
                    UserInfoService,
                    QuoteOfTheDayService
                ]
            })
            .overrideTemplate(QuoteOfTheDayDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuoteOfTheDayDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuoteOfTheDayService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuoteOfTheDay(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.quoteOfTheDay = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quoteOfTheDayListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuoteOfTheDay();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.quoteOfTheDay = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quoteOfTheDayListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
