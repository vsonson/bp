import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TrackMetricQuestion } from './track-metric-question.model';
import { TrackMetricQuestionPopupService } from './track-metric-question-popup.service';
import { TrackMetricQuestionService } from './track-metric-question.service';

@Component({
    selector: 'jhi-track-metric-question-delete-dialog',
    templateUrl: './track-metric-question-delete-dialog.component.html'
})
export class TrackMetricQuestionDeleteDialogComponent {

    trackMetricQuestion: TrackMetricQuestion;

    constructor(
        private trackMetricQuestionService: TrackMetricQuestionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trackMetricQuestionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'trackMetricQuestionListModification',
                content: 'Deleted an trackMetricQuestion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-track-metric-question-delete-popup',
    template: ''
})
export class TrackMetricQuestionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trackMetricQuestionPopupService: TrackMetricQuestionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.trackMetricQuestionPopupService
                .open(TrackMetricQuestionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
