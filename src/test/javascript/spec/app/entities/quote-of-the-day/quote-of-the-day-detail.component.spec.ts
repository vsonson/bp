/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BalancepositionTestModule } from '../../../test.module';
import { QuoteOfTheDayDetailComponent } from '../../../../../../main/webapp/app/entities/quote-of-the-day/quote-of-the-day-detail.component';
import { QuoteOfTheDayService } from '../../../../../../main/webapp/app/entities/quote-of-the-day/quote-of-the-day.service';
import { QuoteOfTheDay } from '../../../../../../main/webapp/app/entities/quote-of-the-day/quote-of-the-day.model';

describe('Component Tests', () => {

    describe('QuoteOfTheDay Management Detail Component', () => {
        let comp: QuoteOfTheDayDetailComponent;
        let fixture: ComponentFixture<QuoteOfTheDayDetailComponent>;
        let service: QuoteOfTheDayService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [QuoteOfTheDayDetailComponent],
                providers: [
                    QuoteOfTheDayService
                ]
            })
            .overrideTemplate(QuoteOfTheDayDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuoteOfTheDayDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuoteOfTheDayService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new QuoteOfTheDay(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.quoteOfTheDay).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
