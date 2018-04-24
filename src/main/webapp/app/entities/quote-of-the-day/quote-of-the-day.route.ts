import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { QuoteOfTheDayComponent } from './quote-of-the-day.component';
import { QuoteOfTheDayDetailComponent } from './quote-of-the-day-detail.component';
import { QuoteOfTheDayPopupComponent } from './quote-of-the-day-dialog.component';
import { QuoteOfTheDayDeletePopupComponent } from './quote-of-the-day-delete-dialog.component';

@Injectable()
export class QuoteOfTheDayResolvePagingParams implements Resolve<any> {

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

export const quoteOfTheDayRoute: Routes = [
    {
        path: 'quote-of-the-day',
        component: QuoteOfTheDayComponent,
        resolve: {
            'pagingParams': QuoteOfTheDayResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuoteOfTheDays'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'quote-of-the-day/:id',
        component: QuoteOfTheDayDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuoteOfTheDays'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quoteOfTheDayPopupRoute: Routes = [
    {
        path: 'quote-of-the-day-new',
        component: QuoteOfTheDayPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuoteOfTheDays'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quote-of-the-day/:id/edit',
        component: QuoteOfTheDayPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuoteOfTheDays'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quote-of-the-day/:id/delete',
        component: QuoteOfTheDayDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuoteOfTheDays'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
