import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MetricHistoryComponent } from './metric-history.component';
import { MetricHistoryDetailComponent } from './metric-history-detail.component';
import { MetricHistoryPopupComponent } from './metric-history-dialog.component';
import { MetricHistoryDeletePopupComponent } from './metric-history-delete-dialog.component';

@Injectable()
export class MetricHistoryResolvePagingParams implements Resolve<any> {

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

export const metricHistoryRoute: Routes = [
    {
        path: 'metric-history',
        component: MetricHistoryComponent,
        resolve: {
            'pagingParams': MetricHistoryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MetricHistories'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'metric-history/:id',
        component: MetricHistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MetricHistories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const metricHistoryPopupRoute: Routes = [
    {
        path: 'metric-history-new',
        component: MetricHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MetricHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'metric-history/:id/edit',
        component: MetricHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MetricHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'metric-history/:id/delete',
        component: MetricHistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MetricHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
