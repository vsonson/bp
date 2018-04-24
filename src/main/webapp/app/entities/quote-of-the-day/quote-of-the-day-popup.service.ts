import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { QuoteOfTheDay } from './quote-of-the-day.model';
import { QuoteOfTheDayService } from './quote-of-the-day.service';

@Injectable()
export class QuoteOfTheDayPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private quoteOfTheDayService: QuoteOfTheDayService

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
                this.quoteOfTheDayService.find(id)
                    .subscribe((quoteOfTheDayResponse: HttpResponse<QuoteOfTheDay>) => {
                        const quoteOfTheDay: QuoteOfTheDay = quoteOfTheDayResponse.body;
                        this.ngbModalRef = this.quoteOfTheDayModalRef(component, quoteOfTheDay);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.quoteOfTheDayModalRef(component, new QuoteOfTheDay());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    quoteOfTheDayModalRef(component: Component, quoteOfTheDay: QuoteOfTheDay): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.quoteOfTheDay = quoteOfTheDay;
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
