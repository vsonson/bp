import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { KeyPair } from './key-pair.model';
import { KeyPairPopupService } from './key-pair-popup.service';
import { KeyPairService } from './key-pair.service';
import { TrackMetricQuestion, TrackMetricQuestionService } from '../track-metric-question';

@Component({
    selector: 'jhi-key-pair-dialog',
    templateUrl: './key-pair-dialog.component.html'
})
export class KeyPairDialogComponent implements OnInit {

    keyPair: KeyPair;
    isSaving: boolean;

    trackmetricquestions: TrackMetricQuestion[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private keyPairService: KeyPairService,
        private trackMetricQuestionService: TrackMetricQuestionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.trackMetricQuestionService.query()
            .subscribe((res: HttpResponse<TrackMetricQuestion[]>) => { this.trackmetricquestions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.keyPair.id !== undefined) {
            this.subscribeToSaveResponse(
                this.keyPairService.update(this.keyPair));
        } else {
            this.subscribeToSaveResponse(
                this.keyPairService.create(this.keyPair));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<KeyPair>>) {
        result.subscribe((res: HttpResponse<KeyPair>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: KeyPair) {
        this.eventManager.broadcast({ name: 'keyPairListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTrackMetricQuestionById(index: number, item: TrackMetricQuestion) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-key-pair-popup',
    template: ''
})
export class KeyPairPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keyPairPopupService: KeyPairPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.keyPairPopupService
                    .open(KeyPairDialogComponent as Component, params['id']);
            } else {
                this.keyPairPopupService
                    .open(KeyPairDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
