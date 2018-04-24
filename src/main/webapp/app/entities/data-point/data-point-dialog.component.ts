import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataPoint } from './data-point.model';
import { DataPointPopupService } from './data-point-popup.service';
import { DataPointService } from './data-point.service';

@Component({
    selector: 'jhi-data-point-dialog',
    templateUrl: './data-point-dialog.component.html'
})
export class DataPointDialogComponent implements OnInit {

    dataPoint: DataPoint;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataPointService: DataPointService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dataPoint.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dataPointService.update(this.dataPoint));
        } else {
            this.subscribeToSaveResponse(
                this.dataPointService.create(this.dataPoint));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DataPoint>>) {
        result.subscribe((res: HttpResponse<DataPoint>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DataPoint) {
        this.eventManager.broadcast({ name: 'dataPointListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-data-point-popup',
    template: ''
})
export class DataPointPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataPointPopupService: DataPointPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dataPointPopupService
                    .open(DataPointDialogComponent as Component, params['id']);
            } else {
                this.dataPointPopupService
                    .open(DataPointDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
