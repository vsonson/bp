import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MetricHistory } from './metric-history.model';
import { MetricHistoryPopupService } from './metric-history-popup.service';
import { MetricHistoryService } from './metric-history.service';

@Component({
    selector: 'jhi-metric-history-delete-dialog',
    templateUrl: './metric-history-delete-dialog.component.html'
})
export class MetricHistoryDeleteDialogComponent {

    metricHistory: MetricHistory;

    constructor(
        private metricHistoryService: MetricHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.metricHistoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'metricHistoryListModification',
                content: 'Deleted an metricHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-metric-history-delete-popup',
    template: ''
})
export class MetricHistoryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private metricHistoryPopupService: MetricHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.metricHistoryPopupService
                .open(MetricHistoryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
