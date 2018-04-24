import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TrackMetricQuestion } from './track-metric-question.model';
import { TrackMetricQuestionService } from './track-metric-question.service';

@Component({
    selector: 'jhi-track-metric-question-detail',
    templateUrl: './track-metric-question-detail.component.html'
})
export class TrackMetricQuestionDetailComponent implements OnInit, OnDestroy {

    trackMetricQuestion: TrackMetricQuestion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private trackMetricQuestionService: TrackMetricQuestionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTrackMetricQuestions();
    }

    load(id) {
        this.trackMetricQuestionService.find(id)
            .subscribe((trackMetricQuestionResponse: HttpResponse<TrackMetricQuestion>) => {
                this.trackMetricQuestion = trackMetricQuestionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTrackMetricQuestions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'trackMetricQuestionListModification',
            (response) => this.load(this.trackMetricQuestion.id)
        );
    }
}
