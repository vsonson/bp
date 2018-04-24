import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BalancepositionUserInfoModule } from './user-info/user-info.module';
import { BalancepositionQuoteOfTheDayModule } from './quote-of-the-day/quote-of-the-day.module';
import { BalancepositionDataPointModule } from './data-point/data-point.module';
import { BalancepositionTrackMetricModule } from './track-metric/track-metric.module';
import { BalancepositionKeyPairModule } from './key-pair/key-pair.module';
import { BalancepositionTrackMetricQuestionModule } from './track-metric-question/track-metric-question.module';
import { BalancepositionMetricHistoryModule } from './metric-history/metric-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BalancepositionUserInfoModule,
        BalancepositionQuoteOfTheDayModule,
        BalancepositionDataPointModule,
        BalancepositionTrackMetricModule,
        BalancepositionKeyPairModule,
        BalancepositionTrackMetricQuestionModule,
        BalancepositionMetricHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BalancepositionEntityModule {}
