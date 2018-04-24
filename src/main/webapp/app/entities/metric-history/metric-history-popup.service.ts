import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MetricHistory } from './metric-history.model';
import { MetricHistoryService } from './metric-history.service';

@Injectable()
export class MetricHistoryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private metricHistoryService: MetricHistoryService

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
                this.metricHistoryService.find(id)
                    .subscribe((metricHistoryResponse: HttpResponse<MetricHistory>) => {
                        const metricHistory: MetricHistory = metricHistoryResponse.body;
                        if (metricHistory.date) {
                            metricHistory.date = {
                                year: metricHistory.date.getFullYear(),
                                month: metricHistory.date.getMonth() + 1,
                                day: metricHistory.date.getDate()
                            };
                        }
                        this.ngbModalRef = this.metricHistoryModalRef(component, metricHistory);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.metricHistoryModalRef(component, new MetricHistory());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    metricHistoryModalRef(component: Component, metricHistory: MetricHistory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.metricHistory = metricHistory;
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
