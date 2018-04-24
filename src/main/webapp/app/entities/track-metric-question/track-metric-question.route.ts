import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TrackMetricQuestionComponent } from './track-metric-question.component';
import { TrackMetricQuestionDetailComponent } from './track-metric-question-detail.component';
import { TrackMetricQuestionPopupComponent } from './track-metric-question-dialog.component';
import { TrackMetricQuestionDeletePopupComponent } from './track-metric-question-delete-dialog.component';

@Injectable()
export class TrackMetricQuestionResolvePagingParams implements Resolve<any> {

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

export const trackMetricQuestionRoute: Routes = [
    {
        path: 'track-metric-question',
        component: TrackMetricQuestionComponent,
        resolve: {
            'pagingParams': TrackMetricQuestionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrackMetricQuestions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'track-metric-question/:id',
        component: TrackMetricQuestionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrackMetricQuestions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trackMetricQuestionPopupRoute: Routes = [
    {
        path: 'track-metric-question-new',
        component: TrackMetricQuestionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrackMetricQuestions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'track-metric-question/:id/edit',
        component: TrackMetricQuestionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrackMetricQuestions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'track-metric-question/:id/delete',
        component: TrackMetricQuestionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrackMetricQuestions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
