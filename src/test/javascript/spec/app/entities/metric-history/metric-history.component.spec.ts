/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BalancepositionTestModule } from '../../../test.module';
import { MetricHistoryComponent } from '../../../../../../main/webapp/app/entities/metric-history/metric-history.component';
import { MetricHistoryService } from '../../../../../../main/webapp/app/entities/metric-history/metric-history.service';
import { MetricHistory } from '../../../../../../main/webapp/app/entities/metric-history/metric-history.model';

describe('Component Tests', () => {

    describe('MetricHistory Management Component', () => {
        let comp: MetricHistoryComponent;
        let fixture: ComponentFixture<MetricHistoryComponent>;
        let service: MetricHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [MetricHistoryComponent],
                providers: [
                    MetricHistoryService
                ]
            })
            .overrideTemplate(MetricHistoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MetricHistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MetricHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MetricHistory(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.metricHistories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
