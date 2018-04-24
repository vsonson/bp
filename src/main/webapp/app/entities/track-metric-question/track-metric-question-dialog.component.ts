import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TrackMetricQuestion } from './track-metric-question.model';
import { TrackMetricQuestionPopupService } from './track-metric-question-popup.service';
import { TrackMetricQuestionService } from './track-metric-question.service';
import { TrackMetric, TrackMetricService } from '../track-metric';

@Component({
    selector: 'jhi-track-metric-question-dialog',
    templateUrl: './track-metric-question-dialog.component.html'
})
export class TrackMetricQuestionDialogComponent implements OnInit {

    trackMetricQuestion: TrackMetricQuestion;
    isSaving: boolean;

    trackmetrics: TrackMetric[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private trackMetricQuestionService: TrackMetricQuestionService,
        private trackMetricService: TrackMetricService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.trackMetricService.query()
            .subscribe((res: HttpResponse<TrackMetric[]>) => { this.trackmetrics = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.trackMetricQuestion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.trackMetricQuestionService.update(this.trackMetricQuestion));
        } else {
            this.subscribeToSaveResponse(
                this.trackMetricQuestionService.create(this.trackMetricQuestion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TrackMetricQuestion>>) {
        result.subscribe((res: HttpResponse<TrackMetricQuestion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TrackMetricQuestion) {
        this.eventManager.broadcast({ name: 'trackMetricQuestionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTrackMetricById(index: number, item: TrackMetric) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-track-metric-question-popup',
    template: ''
})
export class TrackMetricQuestionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trackMetricQuestionPopupService: TrackMetricQuestionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.trackMetricQuestionPopupService
                    .open(TrackMetricQuestionDialogComponent as Component, params['id']);
            } else {
                this.trackMetricQuestionPopupService
                    .open(TrackMetricQuestionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
