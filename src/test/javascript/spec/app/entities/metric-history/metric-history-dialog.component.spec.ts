/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BalancepositionTestModule } from '../../../test.module';
import { MetricHistoryDialogComponent } from '../../../../../../main/webapp/app/entities/metric-history/metric-history-dialog.component';
import { MetricHistoryService } from '../../../../../../main/webapp/app/entities/metric-history/metric-history.service';
import { MetricHistory } from '../../../../../../main/webapp/app/entities/metric-history/metric-history.model';
import { TrackMetricService } from '../../../../../../main/webapp/app/entities/track-metric';
import { TrackMetricQuestionService } from '../../../../../../main/webapp/app/entities/track-metric-question';
import { UserInfoService } from '../../../../../../main/webapp/app/entities/user-info';

describe('Component Tests', () => {

    describe('MetricHistory Management Dialog Component', () => {
        let comp: MetricHistoryDialogComponent;
        let fixture: ComponentFixture<MetricHistoryDialogComponent>;
        let service: MetricHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [MetricHistoryDialogComponent],
                providers: [
                    TrackMetricService,
                    TrackMetricQuestionService,
                    UserInfoService,
                    MetricHistoryService
                ]
            })
            .overrideTemplate(MetricHistoryDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MetricHistoryDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MetricHistoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MetricHistory(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.metricHistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'metricHistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MetricHistory();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.metricHistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'metricHistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
