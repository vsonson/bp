import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { KeyPair } from './key-pair.model';
import { KeyPairService } from './key-pair.service';

@Component({
    selector: 'jhi-key-pair-detail',
    templateUrl: './key-pair-detail.component.html'
})
export class KeyPairDetailComponent implements OnInit, OnDestroy {

    keyPair: KeyPair;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private keyPairService: KeyPairService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInKeyPairs();
    }

    load(id) {
        this.keyPairService.find(id)
            .subscribe((keyPairResponse: HttpResponse<KeyPair>) => {
                this.keyPair = keyPairResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInKeyPairs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'keyPairListModification',
            (response) => this.load(this.keyPair.id)
        );
    }
}
