import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DataPointComponent } from './data-point.component';
import { DataPointDetailComponent } from './data-point-detail.component';
import { DataPointPopupComponent } from './data-point-dialog.component';
import { DataPointDeletePopupComponent } from './data-point-delete-dialog.component';

@Injectable()
export class DataPointResolvePagingParams implements Resolve<any> {

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

export const dataPointRoute: Routes = [
    {
        path: 'data-point',
        component: DataPointComponent,
        resolve: {
            'pagingParams': DataPointResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataPoints'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'data-point/:id',
        component: DataPointDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataPoints'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dataPointPopupRoute: Routes = [
    {
        path: 'data-point-new',
        component: DataPointPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataPoints'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-point/:id/edit',
        component: DataPointPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataPoints'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-point/:id/delete',
        component: DataPointDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataPoints'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
