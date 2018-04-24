import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TrackMetricQuestion } from './track-metric-question.model';
import { TrackMetricQuestionService } from './track-metric-question.service';

@Injectable()
export class TrackMetricQuestionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private trackMetricQuestionService: TrackMetricQuestionService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.trackMetricQuestionService.find(id)
                    .subscribe((trackMetricQuestionResponse: HttpResponse<TrackMetricQuestion>) => {
                        const trackMetricQuestion: TrackMetricQuestion = trackMetricQuestionResponse.body;
                        this.ngbModalRef = this.trackMetricQuestionModalRef(component, trackMetricQuestion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.trackMetricQuestionModalRef(component, new TrackMetricQuestion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    trackMetricQuestionModalRef(component: Component, trackMetricQuestion: TrackMetricQuestion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.trackMetricQuestion = trackMetricQuestion;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
