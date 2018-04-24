/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BalancepositionTestModule } from '../../../test.module';
import { QuoteOfTheDayComponent } from '../../../../../../main/webapp/app/entities/quote-of-the-day/quote-of-the-day.component';
import { QuoteOfTheDayService } from '../../../../../../main/webapp/app/entities/quote-of-the-day/quote-of-the-day.service';
import { QuoteOfTheDay } from '../../../../../../main/webapp/app/entities/quote-of-the-day/quote-of-the-day.model';

describe('Component Tests', () => {

    describe('QuoteOfTheDay Management Component', () => {
        let comp: QuoteOfTheDayComponent;
        let fixture: ComponentFixture<QuoteOfTheDayComponent>;
        let service: QuoteOfTheDayService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [QuoteOfTheDayComponent],
                providers: [
                    QuoteOfTheDayService
                ]
            })
            .overrideTemplate(QuoteOfTheDayComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuoteOfTheDayComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuoteOfTheDayService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new QuoteOfTheDay(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.quoteOfTheDays[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
