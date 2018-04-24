import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { TrackMetric } from './track-metric.model';
import { TrackMetricPopupService } from './track-metric-popup.service';
import { TrackMetricService } from './track-metric.service';

@Component({
    selector: 'jhi-track-metric-dialog',
    templateUrl: './track-metric-dialog.component.html'
})
export class TrackMetricDialogComponent implements OnInit {

    trackMetric: TrackMetric;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private trackMetricService: TrackMetricService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.trackMetric.id !== undefined) {
            this.subscribeToSaveResponse(
                this.trackMetricService.update(this.trackMetric));
        } else {
            this.subscribeToSaveResponse(
                this.trackMetricService.create(this.trackMetric));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TrackMetric>>) {
        result.subscribe((res: HttpResponse<TrackMetric>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TrackMetric) {
        this.eventManager.broadcast({ name: 'trackMetricListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-track-metric-popup',
    template: ''
})
export class TrackMetricPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trackMetricPopupService: TrackMetricPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.trackMetricPopupService
                    .open(TrackMetricDialogComponent as Component, params['id']);
            } else {
                this.trackMetricPopupService
                    .open(TrackMetricDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
