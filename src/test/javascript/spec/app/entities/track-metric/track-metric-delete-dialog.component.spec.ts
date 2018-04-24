/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BalancepositionTestModule } from '../../../test.module';
import { TrackMetricDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/track-metric/track-metric-delete-dialog.component';
import { TrackMetricService } from '../../../../../../main/webapp/app/entities/track-metric/track-metric.service';

describe('Component Tests', () => {

    describe('TrackMetric Management Delete Component', () => {
        let comp: TrackMetricDeleteDialogComponent;
        let fixture: ComponentFixture<TrackMetricDeleteDialogComponent>;
        let service: TrackMetricService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [TrackMetricDeleteDialogComponent],
                providers: [
                    TrackMetricService
                ]
            })
            .overrideTemplate(TrackMetricDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrackMetricDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrackMetricService);
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
