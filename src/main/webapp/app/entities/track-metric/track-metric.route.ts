import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TrackMetricComponent } from './track-metric.component';
import { TrackMetricDetailComponent } from './track-metric-detail.component';
import { TrackMetricPopupComponent } from './track-metric-dialog.component';
import { TrackMetricDeletePopupComponent } from './track-metric-delete-dialog.component';

@Injectable()
export class TrackMetricResolvePagingParams implements Resolve<any> {

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

export const trackMetricRoute: Routes = [
    {
        path: 'track-metric',
        component: TrackMetricComponent,
        resolve: {
            'pagingParams': TrackMetricResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrackMetrics'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'track-metric/:id',
        component: TrackMetricDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrackMetrics'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trackMetricPopupRoute: Routes = [
    {
        path: 'track-metric-new',
        component: TrackMetricPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrackMetrics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'track-metric/:id/edit',
        component: TrackMetricPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrackMetrics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'track-metric/:id/delete',
        component: TrackMetricDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrackMetrics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
