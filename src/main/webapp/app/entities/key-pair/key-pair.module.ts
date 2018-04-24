import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BalancepositionSharedModule } from '../../shared';
import {
    KeyPairService,
    KeyPairPopupService,
    KeyPairComponent,
    KeyPairDetailComponent,
    KeyPairDialogComponent,
    KeyPairPopupComponent,
    KeyPairDeletePopupComponent,
    KeyPairDeleteDialogComponent,
    keyPairRoute,
    keyPairPopupRoute,
    KeyPairResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...keyPairRoute,
    ...keyPairPopupRoute,
];

@NgModule({
    imports: [
        BalancepositionSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        KeyPairComponent,
        KeyPairDetailComponent,
        KeyPairDialogComponent,
        KeyPairDeleteDialogComponent,
        KeyPairPopupComponent,
        KeyPairDeletePopupComponent,
    ],
    entryComponents: [
        KeyPairComponent,
        KeyPairDialogComponent,
        KeyPairPopupComponent,
        KeyPairDeleteDialogComponent,
        KeyPairDeletePopupComponent,
    ],
    providers: [
        KeyPairService,
        KeyPairPopupService,
        KeyPairResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BalancepositionKeyPairModule {}
