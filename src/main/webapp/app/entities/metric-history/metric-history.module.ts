import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BalancepositionSharedModule } from '../../shared';
import {
    MetricHistoryService,
    MetricHistoryPopupService,
    MetricHistoryComponent,
    MetricHistoryDetailComponent,
    MetricHistoryDialogComponent,
    MetricHistoryPopupComponent,
    MetricHistoryDeletePopupComponent,
    MetricHistoryDeleteDialogComponent,
    metricHistoryRoute,
    metricHistoryPopupRoute,
    MetricHistoryResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...metricHistoryRoute,
    ...metricHistoryPopupRoute,
];

@NgModule({
    imports: [
        BalancepositionSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MetricHistoryComponent,
        MetricHistoryDetailComponent,
        MetricHistoryDialogComponent,
        MetricHistoryDeleteDialogComponent,
        MetricHistoryPopupComponent,
        MetricHistoryDeletePopupComponent,
    ],
    entryComponents: [
        MetricHistoryComponent,
        MetricHistoryDialogComponent,
        MetricHistoryPopupComponent,
        MetricHistoryDeleteDialogComponent,
        MetricHistoryDeletePopupComponent,
    ],
    providers: [
        MetricHistoryService,
        MetricHistoryPopupService,
        MetricHistoryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BalancepositionMetricHistoryModule {}
