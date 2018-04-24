import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { QuoteOfTheDay } from './quote-of-the-day.model';
import { QuoteOfTheDayService } from './quote-of-the-day.service';

@Component({
    selector: 'jhi-quote-of-the-day-detail',
    templateUrl: './quote-of-the-day-detail.component.html'
})
export class QuoteOfTheDayDetailComponent implements OnInit, OnDestroy {

    quoteOfTheDay: QuoteOfTheDay;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private quoteOfTheDayService: QuoteOfTheDayService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInQuoteOfTheDays();
    }

    load(id) {
        this.quoteOfTheDayService.find(id)
            .subscribe((quoteOfTheDayResponse: HttpResponse<QuoteOfTheDay>) => {
                this.quoteOfTheDay = quoteOfTheDayResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInQuoteOfTheDays() {
        this.eventSubscriber = this.eventManager.subscribe(
            'quoteOfTheDayListModification',
            (response) => this.load(this.quoteOfTheDay.id)
        );
    }
}
