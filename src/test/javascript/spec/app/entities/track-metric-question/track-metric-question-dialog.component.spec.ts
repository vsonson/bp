/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BalancepositionTestModule } from '../../../test.module';
import { TrackMetricQuestionDialogComponent } from '../../../../../../main/webapp/app/entities/track-metric-question/track-metric-question-dialog.component';
import { TrackMetricQuestionService } from '../../../../../../main/webapp/app/entities/track-metric-question/track-metric-question.service';
import { TrackMetricQuestion } from '../../../../../../main/webapp/app/entities/track-metric-question/track-metric-question.model';
import { TrackMetricService } from '../../../../../../main/webapp/app/entities/track-metric';

describe('Component Tests', () => {

    describe('TrackMetricQuestion Management Dialog Component', () => {
        let comp: TrackMetricQuestionDialogComponent;
        let fixture: ComponentFixture<TrackMetricQuestionDialogComponent>;
        let service: TrackMetricQuestionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [TrackMetricQuestionDialogComponent],
                providers: [
                    TrackMetricService,
                    TrackMetricQuestionService
                ]
            })
            .overrideTemplate(TrackMetricQuestionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrackMetricQuestionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrackMetricQuestionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TrackMetricQuestion(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.trackMetricQuestion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'trackMetricQuestionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TrackMetricQuestion();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.trackMetricQuestion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'trackMetricQuestionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
