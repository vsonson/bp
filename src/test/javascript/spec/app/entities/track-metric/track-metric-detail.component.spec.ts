/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BalancepositionTestModule } from '../../../test.module';
import { TrackMetricDetailComponent } from '../../../../../../main/webapp/app/entities/track-metric/track-metric-detail.component';
import { TrackMetricService } from '../../../../../../main/webapp/app/entities/track-metric/track-metric.service';
import { TrackMetric } from '../../../../../../main/webapp/app/entities/track-metric/track-metric.model';

describe('Component Tests', () => {

    describe('TrackMetric Management Detail Component', () => {
        let comp: TrackMetricDetailComponent;
        let fixture: ComponentFixture<TrackMetricDetailComponent>;
        let service: TrackMetricService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [TrackMetricDetailComponent],
                providers: [
                    TrackMetricService
                ]
            })
            .overrideTemplate(TrackMetricDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrackMetricDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrackMetricService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TrackMetric(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.trackMetric).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
