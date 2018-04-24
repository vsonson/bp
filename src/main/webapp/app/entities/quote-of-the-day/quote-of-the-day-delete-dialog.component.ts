import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuoteOfTheDay } from './quote-of-the-day.model';
import { QuoteOfTheDayPopupService } from './quote-of-the-day-popup.service';
import { QuoteOfTheDayService } from './quote-of-the-day.service';

@Component({
    selector: 'jhi-quote-of-the-day-delete-dialog',
    templateUrl: './quote-of-the-day-delete-dialog.component.html'
})
export class QuoteOfTheDayDeleteDialogComponent {

    quoteOfTheDay: QuoteOfTheDay;

    constructor(
        private quoteOfTheDayService: QuoteOfTheDayService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.quoteOfTheDayService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'quoteOfTheDayListModification',
                content: 'Deleted an quoteOfTheDay'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-quote-of-the-day-delete-popup',
    template: ''
})
export class QuoteOfTheDayDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quoteOfTheDayPopupService: QuoteOfTheDayPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.quoteOfTheDayPopupService
                .open(QuoteOfTheDayDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
