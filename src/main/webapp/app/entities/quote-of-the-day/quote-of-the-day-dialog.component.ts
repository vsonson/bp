import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { QuoteOfTheDay } from './quote-of-the-day.model';
import { QuoteOfTheDayPopupService } from './quote-of-the-day-popup.service';
import { QuoteOfTheDayService } from './quote-of-the-day.service';
import { UserInfo, UserInfoService } from '../user-info';

@Component({
    selector: 'jhi-quote-of-the-day-dialog',
    templateUrl: './quote-of-the-day-dialog.component.html'
})
export class QuoteOfTheDayDialogComponent implements OnInit {

    quoteOfTheDay: QuoteOfTheDay;
    isSaving: boolean;

    userinfos: UserInfo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private quoteOfTheDayService: QuoteOfTheDayService,
        private userInfoService: UserInfoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userInfoService.query()
            .subscribe((res: HttpResponse<UserInfo[]>) => { this.userinfos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.quoteOfTheDay.id !== undefined) {
            this.subscribeToSaveResponse(
                this.quoteOfTheDayService.update(this.quoteOfTheDay));
        } else {
            this.subscribeToSaveResponse(
                this.quoteOfTheDayService.create(this.quoteOfTheDay));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<QuoteOfTheDay>>) {
        result.subscribe((res: HttpResponse<QuoteOfTheDay>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: QuoteOfTheDay) {
        this.eventManager.broadcast({ name: 'quoteOfTheDayListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserInfoById(index: number, item: UserInfo) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-quote-of-the-day-popup',
    template: ''
})
export class QuoteOfTheDayPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quoteOfTheDayPopupService: QuoteOfTheDayPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.quoteOfTheDayPopupService
                    .open(QuoteOfTheDayDialogComponent as Component, params['id']);
            } else {
                this.quoteOfTheDayPopupService
                    .open(QuoteOfTheDayDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
