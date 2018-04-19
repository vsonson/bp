import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BalancepositionUserInfoModule } from './user-info/user-info.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BalancepositionUserInfoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BalancepositionEntityModule {}
