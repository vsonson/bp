import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataPoint } from './data-point.model';
import { DataPointPopupService } from './data-point-popup.service';
import { DataPointService } from './data-point.service';

@Component({
    selector: 'jhi-data-point-delete-dialog',
    templateUrl: './data-point-delete-dialog.component.html'
})
export class DataPointDeleteDialogComponent {

    dataPoint: DataPoint;

    constructor(
        private dataPointService: DataPointService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dataPointService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dataPointListModification',
                content: 'Deleted an dataPoint'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-data-point-delete-popup',
    template: ''
})
export class DataPointDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataPointPopupService: DataPointPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dataPointPopupService
                .open(DataPointDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
