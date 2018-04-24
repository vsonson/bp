import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DataPoint } from './data-point.model';
import { DataPointService } from './data-point.service';

@Component({
    selector: 'jhi-data-point-detail',
    templateUrl: './data-point-detail.component.html'
})
export class DataPointDetailComponent implements OnInit, OnDestroy {

    dataPoint: DataPoint;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataPointService: DataPointService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDataPoints();
    }

    load(id) {
        this.dataPointService.find(id)
            .subscribe((dataPointResponse: HttpResponse<DataPoint>) => {
                this.dataPoint = dataPointResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDataPoints() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dataPointListModification',
            (response) => this.load(this.dataPoint.id)
        );
    }
}
