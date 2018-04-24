/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BalancepositionTestModule } from '../../../test.module';
import { TrackMetricQuestionDetailComponent } from '../../../../../../main/webapp/app/entities/track-metric-question/track-metric-question-detail.component';
import { TrackMetricQuestionService } from '../../../../../../main/webapp/app/entities/track-metric-question/track-metric-question.service';
import { TrackMetricQuestion } from '../../../../../../main/webapp/app/entities/track-metric-question/track-metric-question.model';

describe('Component Tests', () => {

    describe('TrackMetricQuestion Management Detail Component', () => {
        let comp: TrackMetricQuestionDetailComponent;
        let fixture: ComponentFixture<TrackMetricQuestionDetailComponent>;
        let service: TrackMetricQuestionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [TrackMetricQuestionDetailComponent],
                providers: [
                    TrackMetricQuestionService
                ]
            })
            .overrideTemplate(TrackMetricQuestionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrackMetricQuestionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrackMetricQuestionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TrackMetricQuestion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.trackMetricQuestion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
