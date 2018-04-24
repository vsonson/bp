import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BalancepositionSharedModule } from '../../shared';
import {
    TrackMetricQuestionService,
    TrackMetricQuestionPopupService,
    TrackMetricQuestionComponent,
    TrackMetricQuestionDetailComponent,
    TrackMetricQuestionDialogComponent,
    TrackMetricQuestionPopupComponent,
    TrackMetricQuestionDeletePopupComponent,
    TrackMetricQuestionDeleteDialogComponent,
    trackMetricQuestionRoute,
    trackMetricQuestionPopupRoute,
    TrackMetricQuestionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...trackMetricQuestionRoute,
    ...trackMetricQuestionPopupRoute,
];

@NgModule({
    imports: [
        BalancepositionSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TrackMetricQuestionComponent,
        TrackMetricQuestionDetailComponent,
        TrackMetricQuestionDialogComponent,
        TrackMetricQuestionDeleteDialogComponent,
        TrackMetricQuestionPopupComponent,
        TrackMetricQuestionDeletePopupComponent,
    ],
    entryComponents: [
        TrackMetricQuestionComponent,
        TrackMetricQuestionDialogComponent,
        TrackMetricQuestionPopupComponent,
        TrackMetricQuestionDeleteDialogComponent,
        TrackMetricQuestionDeletePopupComponent,
    ],
    providers: [
        TrackMetricQuestionService,
        TrackMetricQuestionPopupService,
        TrackMetricQuestionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BalancepositionTrackMetricQuestionModule {}
