import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MetricHistory } from './metric-history.model';
import { MetricHistoryService } from './metric-history.service';

@Component({
    selector: 'jhi-metric-history-detail',
    templateUrl: './metric-history-detail.component.html'
})
export class MetricHistoryDetailComponent implements OnInit, OnDestroy {

    metricHistory: MetricHistory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private metricHistoryService: MetricHistoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMetricHistories();
    }

    load(id) {
        this.metricHistoryService.find(id)
            .subscribe((metricHistoryResponse: HttpResponse<MetricHistory>) => {
                this.metricHistory = metricHistoryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMetricHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'metricHistoryListModification',
            (response) => this.load(this.metricHistory.id)
        );
    }
}
