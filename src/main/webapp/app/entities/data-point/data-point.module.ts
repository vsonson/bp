import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BalancepositionSharedModule } from '../../shared';
import {
    DataPointService,
    DataPointPopupService,
    DataPointComponent,
    DataPointDetailComponent,
    DataPointDialogComponent,
    DataPointPopupComponent,
    DataPointDeletePopupComponent,
    DataPointDeleteDialogComponent,
    dataPointRoute,
    dataPointPopupRoute,
    DataPointResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...dataPointRoute,
    ...dataPointPopupRoute,
];

@NgModule({
    imports: [
        BalancepositionSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DataPointComponent,
        DataPointDetailComponent,
        DataPointDialogComponent,
        DataPointDeleteDialogComponent,
        DataPointPopupComponent,
        DataPointDeletePopupComponent,
    ],
    entryComponents: [
        DataPointComponent,
        DataPointDialogComponent,
        DataPointPopupComponent,
        DataPointDeleteDialogComponent,
        DataPointDeletePopupComponent,
    ],
    providers: [
        DataPointService,
        DataPointPopupService,
        DataPointResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BalancepositionDataPointModule {}
