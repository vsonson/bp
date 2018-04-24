import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { TrackMetric } from './track-metric.model';
import { TrackMetricService } from './track-metric.service';

@Component({
    selector: 'jhi-track-metric-detail',
    templateUrl: './track-metric-detail.component.html'
})
export class TrackMetricDetailComponent implements OnInit, OnDestroy {

    trackMetric: TrackMetric;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private trackMetricService: TrackMetricService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTrackMetrics();
    }

    load(id) {
        this.trackMetricService.find(id)
            .subscribe((trackMetricResponse: HttpResponse<TrackMetric>) => {
                this.trackMetric = trackMetricResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTrackMetrics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'trackMetricListModification',
            (response) => this.load(this.trackMetric.id)
        );
    }
}
