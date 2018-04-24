/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BalancepositionTestModule } from '../../../test.module';
import { MetricHistoryDetailComponent } from '../../../../../../main/webapp/app/entities/metric-history/metric-history-detail.component';
import { MetricHistoryService } from '../../../../../../main/webapp/app/entities/metric-history/metric-history.service';
import { MetricHistory } from '../../../../../../main/webapp/app/entities/metric-history/metric-history.model';

describe('Component Tests', () => {

    describe('MetricHistory Management Detail Component', () => {
        let comp: MetricHistoryDetailComponent;
        let fixture: ComponentFixture<MetricHistoryDetailComponent>;
        let service: MetricHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [MetricHistoryDetailComponent],
                providers: [
                    MetricHistoryService
                ]
            })
            .overrideTemplate(MetricHistoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MetricHistoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MetricHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MetricHistory(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.metricHistory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
