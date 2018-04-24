import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { KeyPairComponent } from './key-pair.component';
import { KeyPairDetailComponent } from './key-pair-detail.component';
import { KeyPairPopupComponent } from './key-pair-dialog.component';
import { KeyPairDeletePopupComponent } from './key-pair-delete-dialog.component';

@Injectable()
export class KeyPairResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const keyPairRoute: Routes = [
    {
        path: 'key-pair',
        component: KeyPairComponent,
        resolve: {
            'pagingParams': KeyPairResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyPairs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'key-pair/:id',
        component: KeyPairDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyPairs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const keyPairPopupRoute: Routes = [
    {
        path: 'key-pair-new',
        component: KeyPairPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyPairs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'key-pair/:id/edit',
        component: KeyPairPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyPairs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'key-pair/:id/delete',
        component: KeyPairDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyPairs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
