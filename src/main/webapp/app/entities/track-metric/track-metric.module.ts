import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BalancepositionSharedModule } from '../../shared';
import {
    TrackMetricService,
    TrackMetricPopupService,
    TrackMetricComponent,
    TrackMetricDetailComponent,
    TrackMetricDialogComponent,
    TrackMetricPopupComponent,
    TrackMetricDeletePopupComponent,
    TrackMetricDeleteDialogComponent,
    trackMetricRoute,
    trackMetricPopupRoute,
    TrackMetricResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...trackMetricRoute,
    ...trackMetricPopupRoute,
];

@NgModule({
    imports: [
        BalancepositionSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TrackMetricComponent,
        TrackMetricDetailComponent,
        TrackMetricDialogComponent,
        TrackMetricDeleteDialogComponent,
        TrackMetricPopupComponent,
        TrackMetricDeletePopupComponent,
    ],
    entryComponents: [
        TrackMetricComponent,
        TrackMetricDialogComponent,
        TrackMetricPopupComponent,
        TrackMetricDeleteDialogComponent,
        TrackMetricDeletePopupComponent,
    ],
    providers: [
        TrackMetricService,
        TrackMetricPopupService,
        TrackMetricResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BalancepositionTrackMetricModule {}
