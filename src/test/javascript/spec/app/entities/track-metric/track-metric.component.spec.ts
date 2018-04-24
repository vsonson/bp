/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BalancepositionTestModule } from '../../../test.module';
import { TrackMetricComponent } from '../../../../../../main/webapp/app/entities/track-metric/track-metric.component';
import { TrackMetricService } from '../../../../../../main/webapp/app/entities/track-metric/track-metric.service';
import { TrackMetric } from '../../../../../../main/webapp/app/entities/track-metric/track-metric.model';

describe('Component Tests', () => {

    describe('TrackMetric Management Component', () => {
        let comp: TrackMetricComponent;
        let fixture: ComponentFixture<TrackMetricComponent>;
        let service: TrackMetricService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [TrackMetricComponent],
                providers: [
                    TrackMetricService
                ]
            })
            .overrideTemplate(TrackMetricComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrackMetricComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrackMetricService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TrackMetric(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.trackMetrics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
