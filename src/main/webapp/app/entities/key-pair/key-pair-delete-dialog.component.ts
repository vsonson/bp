import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { KeyPair } from './key-pair.model';
import { KeyPairPopupService } from './key-pair-popup.service';
import { KeyPairService } from './key-pair.service';

@Component({
    selector: 'jhi-key-pair-delete-dialog',
    templateUrl: './key-pair-delete-dialog.component.html'
})
export class KeyPairDeleteDialogComponent {

    keyPair: KeyPair;

    constructor(
        private keyPairService: KeyPairService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.keyPairService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'keyPairListModification',
                content: 'Deleted an keyPair'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-key-pair-delete-popup',
    template: ''
})
export class KeyPairDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keyPairPopupService: KeyPairPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.keyPairPopupService
                .open(KeyPairDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
