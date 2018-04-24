/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BalancepositionTestModule } from '../../../test.module';
import { TrackMetricQuestionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/track-metric-question/track-metric-question-delete-dialog.component';
import { TrackMetricQuestionService } from '../../../../../../main/webapp/app/entities/track-metric-question/track-metric-question.service';

describe('Component Tests', () => {

    describe('TrackMetricQuestion Management Delete Component', () => {
        let comp: TrackMetricQuestionDeleteDialogComponent;
        let fixture: ComponentFixture<TrackMetricQuestionDeleteDialogComponent>;
        let service: TrackMetricQuestionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [TrackMetricQuestionDeleteDialogComponent],
                providers: [
                    TrackMetricQuestionService
                ]
            })
            .overrideTemplate(TrackMetricQuestionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrackMetricQuestionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrackMetricQuestionService);
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
