import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BalancepositionSharedModule } from '../../shared';
import {
    QuoteOfTheDayService,
    QuoteOfTheDayPopupService,
    QuoteOfTheDayComponent,
    QuoteOfTheDayDetailComponent,
    QuoteOfTheDayDialogComponent,
    QuoteOfTheDayPopupComponent,
    QuoteOfTheDayDeletePopupComponent,
    QuoteOfTheDayDeleteDialogComponent,
    quoteOfTheDayRoute,
    quoteOfTheDayPopupRoute,
    QuoteOfTheDayResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...quoteOfTheDayRoute,
    ...quoteOfTheDayPopupRoute,
];

@NgModule({
    imports: [
        BalancepositionSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        QuoteOfTheDayComponent,
        QuoteOfTheDayDetailComponent,
        QuoteOfTheDayDialogComponent,
        QuoteOfTheDayDeleteDialogComponent,
        QuoteOfTheDayPopupComponent,
        QuoteOfTheDayDeletePopupComponent,
    ],
    entryComponents: [
        QuoteOfTheDayComponent,
        QuoteOfTheDayDialogComponent,
        QuoteOfTheDayPopupComponent,
        QuoteOfTheDayDeleteDialogComponent,
        QuoteOfTheDayDeletePopupComponent,
    ],
    providers: [
        QuoteOfTheDayService,
        QuoteOfTheDayPopupService,
        QuoteOfTheDayResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BalancepositionQuoteOfTheDayModule {}
