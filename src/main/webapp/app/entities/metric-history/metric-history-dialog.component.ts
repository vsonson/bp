import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MetricHistory } from './metric-history.model';
import { MetricHistoryPopupService } from './metric-history-popup.service';
import { MetricHistoryService } from './metric-history.service';
import { TrackMetric, TrackMetricService } from '../track-metric';
import { TrackMetricQuestion, TrackMetricQuestionService } from '../track-metric-question';
import { UserInfo, UserInfoService } from '../user-info';

@Component({
    selector: 'jhi-metric-history-dialog',
    templateUrl: './metric-history-dialog.component.html'
})
export class MetricHistoryDialogComponent implements OnInit {

    metricHistory: MetricHistory;
    isSaving: boolean;

    trackmetrics: TrackMetric[];

    metricquestions: TrackMetricQuestion[];

    userinfos: UserInfo[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private metricHistoryService: MetricHistoryService,
        private trackMetricService: TrackMetricService,
        private trackMetricQuestionService: TrackMetricQuestionService,
        private userInfoService: UserInfoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.trackMetricService
            .query({filter: 'metrichistory-is-null'})
            .subscribe((res: HttpResponse<TrackMetric[]>) => {
                if (!this.metricHistory.trackMetric || !this.metricHistory.trackMetric.id) {
                    this.trackmetrics = res.body;
                } else {
                    this.trackMetricService
                        .find(this.metricHistory.trackMetric.id)
                        .subscribe((subRes: HttpResponse<TrackMetric>) => {
                            this.trackmetrics = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.trackMetricQuestionService
            .query({filter: 'metrichistory-is-null'})
            .subscribe((res: HttpResponse<TrackMetricQuestion[]>) => {
                if (!this.metricHistory.metricQuestion || !this.metricHistory.metricQuestion.id) {
                    this.metricquestions = res.body;
                } else {
                    this.trackMetricQuestionService
                        .find(this.metricHistory.metricQuestion.id)
                        .subscribe((subRes: HttpResponse<TrackMetricQuestion>) => {
                            this.metricquestions = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userInfoService.query()
            .subscribe((res: HttpResponse<UserInfo[]>) => { this.userinfos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.metricHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.metricHistoryService.update(this.metricHistory));
        } else {
            this.subscribeToSaveResponse(
                this.metricHistoryService.create(this.metricHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MetricHistory>>) {
        result.subscribe((res: HttpResponse<MetricHistory>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MetricHistory) {
        this.eventManager.broadcast({ name: 'metricHistoryListModification', content: 'OK'});
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

    trackTrackMetricQuestionById(index: number, item: TrackMetricQuestion) {
        return item.id;
    }

    trackUserInfoById(index: number, item: UserInfo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-metric-history-popup',
    template: ''
})
export class MetricHistoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private metricHistoryPopupService: MetricHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.metricHistoryPopupService
                    .open(MetricHistoryDialogComponent as Component, params['id']);
            } else {
                this.metricHistoryPopupService
                    .open(MetricHistoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
