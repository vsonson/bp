import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MetricHistory } from './metric-history.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MetricHistory>;

@Injectable()
export class MetricHistoryService {

    private resourceUrl =  SERVER_API_URL + 'api/metric-histories';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(metricHistory: MetricHistory): Observable<EntityResponseType> {
        const copy = this.convert(metricHistory);
        return this.http.post<MetricHistory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(metricHistory: MetricHistory): Observable<EntityResponseType> {
        const copy = this.convert(metricHistory);
        return this.http.put<MetricHistory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MetricHistory>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MetricHistory[]>> {
        const options = createRequestOption(req);
        return this.http.get<MetricHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MetricHistory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MetricHistory = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MetricHistory[]>): HttpResponse<MetricHistory[]> {
        const jsonResponse: MetricHistory[] = res.body;
        const body: MetricHistory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MetricHistory.
     */
    private convertItemFromServer(metricHistory: MetricHistory): MetricHistory {
        const copy: MetricHistory = Object.assign({}, metricHistory);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(metricHistory.date);
        return copy;
    }

    /**
     * Convert a MetricHistory to a JSON which can be sent to the server.
     */
    private convert(metricHistory: MetricHistory): MetricHistory {
        const copy: MetricHistory = Object.assign({}, metricHistory);
        copy.date = this.dateUtils
            .convertLocalDateToServer(metricHistory.date);
        return copy;
    }
}
