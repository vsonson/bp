import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TrackMetric } from './track-metric.model';
import { TrackMetricPopupService } from './track-metric-popup.service';
import { TrackMetricService } from './track-metric.service';

@Component({
    selector: 'jhi-track-metric-delete-dialog',
    templateUrl: './track-metric-delete-dialog.component.html'
})
export class TrackMetricDeleteDialogComponent {

    trackMetric: TrackMetric;

    constructor(
        private trackMetricService: TrackMetricService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trackMetricService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'trackMetricListModification',
                content: 'Deleted an trackMetric'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-track-metric-delete-popup',
    template: ''
})
export class TrackMetricDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trackMetricPopupService: TrackMetricPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.trackMetricPopupService
                .open(TrackMetricDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
