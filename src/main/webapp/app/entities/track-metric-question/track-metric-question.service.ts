import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TrackMetricQuestion } from './track-metric-question.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TrackMetricQuestion>;

@Injectable()
export class TrackMetricQuestionService {

    private resourceUrl =  SERVER_API_URL + 'api/track-metric-questions';

    constructor(private http: HttpClient) { }

    create(trackMetricQuestion: TrackMetricQuestion): Observable<EntityResponseType> {
        const copy = this.convert(trackMetricQuestion);
        return this.http.post<TrackMetricQuestion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(trackMetricQuestion: TrackMetricQuestion): Observable<EntityResponseType> {
        const copy = this.convert(trackMetricQuestion);
        return this.http.put<TrackMetricQuestion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TrackMetricQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TrackMetricQuestion[]>> {
        const options = createRequestOption(req);
        return this.http.get<TrackMetricQuestion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TrackMetricQuestion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TrackMetricQuestion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TrackMetricQuestion[]>): HttpResponse<TrackMetricQuestion[]> {
        const jsonResponse: TrackMetricQuestion[] = res.body;
        const body: TrackMetricQuestion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TrackMetricQuestion.
     */
    private convertItemFromServer(trackMetricQuestion: TrackMetricQuestion): TrackMetricQuestion {
        const copy: TrackMetricQuestion = Object.assign({}, trackMetricQuestion);
        return copy;
    }

    /**
     * Convert a TrackMetricQuestion to a JSON which can be sent to the server.
     */
    private convert(trackMetricQuestion: TrackMetricQuestion): TrackMetricQuestion {
        const copy: TrackMetricQuestion = Object.assign({}, trackMetricQuestion);
        return copy;
    }
}
