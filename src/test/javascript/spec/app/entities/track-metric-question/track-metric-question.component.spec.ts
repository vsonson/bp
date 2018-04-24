/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BalancepositionTestModule } from '../../../test.module';
import { TrackMetricQuestionComponent } from '../../../../../../main/webapp/app/entities/track-metric-question/track-metric-question.component';
import { TrackMetricQuestionService } from '../../../../../../main/webapp/app/entities/track-metric-question/track-metric-question.service';
import { TrackMetricQuestion } from '../../../../../../main/webapp/app/entities/track-metric-question/track-metric-question.model';

describe('Component Tests', () => {

    describe('TrackMetricQuestion Management Component', () => {
        let comp: TrackMetricQuestionComponent;
        let fixture: ComponentFixture<TrackMetricQuestionComponent>;
        let service: TrackMetricQuestionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [TrackMetricQuestionComponent],
                providers: [
                    TrackMetricQuestionService
                ]
            })
            .overrideTemplate(TrackMetricQuestionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrackMetricQuestionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrackMetricQuestionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TrackMetricQuestion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.trackMetricQuestions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
