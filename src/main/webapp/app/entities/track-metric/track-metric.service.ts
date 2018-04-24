import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TrackMetric } from './track-metric.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TrackMetric>;

@Injectable()
export class TrackMetricService {

    private resourceUrl =  SERVER_API_URL + 'api/track-metrics';

    constructor(private http: HttpClient) { }

    create(trackMetric: TrackMetric): Observable<EntityResponseType> {
        const copy = this.convert(trackMetric);
        return this.http.post<TrackMetric>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(trackMetric: TrackMetric): Observable<EntityResponseType> {
        const copy = this.convert(trackMetric);
        return this.http.put<TrackMetric>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TrackMetric>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TrackMetric[]>> {
        const options = createRequestOption(req);
        return this.http.get<TrackMetric[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TrackMetric[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TrackMetric = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TrackMetric[]>): HttpResponse<TrackMetric[]> {
        const jsonResponse: TrackMetric[] = res.body;
        const body: TrackMetric[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TrackMetric.
     */
    private convertItemFromServer(trackMetric: TrackMetric): TrackMetric {
        const copy: TrackMetric = Object.assign({}, trackMetric);
        return copy;
    }

    /**
     * Convert a TrackMetric to a JSON which can be sent to the server.
     */
    private convert(trackMetric: TrackMetric): TrackMetric {
        const copy: TrackMetric = Object.assign({}, trackMetric);
        return copy;
    }
}
