import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BalancepositionSharedModule } from '../../shared';
import { BalancepositionAdminModule } from '../../admin/admin.module';
import {
    UserInfoService,
    UserInfoPopupService,
    UserInfoComponent,
    UserInfoDetailComponent,
    UserInfoDialogComponent,
    UserInfoPopupComponent,
    UserInfoDeletePopupComponent,
    UserInfoDeleteDialogComponent,
    userInfoRoute,
    userInfoPopupRoute,
    UserInfoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userInfoRoute,
    ...userInfoPopupRoute,
];

@NgModule({
    imports: [
        BalancepositionSharedModule,
        BalancepositionAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserInfoComponent,
        UserInfoDetailComponent,
        UserInfoDialogComponent,
        UserInfoDeleteDialogComponent,
        UserInfoPopupComponent,
        UserInfoDeletePopupComponent,
    ],
    entryComponents: [
        UserInfoComponent,
        UserInfoDialogComponent,
        UserInfoPopupComponent,
        UserInfoDeleteDialogComponent,
        UserInfoDeletePopupComponent,
    ],
    providers: [
        UserInfoService,
        UserInfoPopupService,
        UserInfoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BalancepositionUserInfoModule {}
