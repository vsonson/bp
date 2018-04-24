import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DataPoint } from './data-point.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DataPoint>;

@Injectable()
export class DataPointService {

    private resourceUrl =  SERVER_API_URL + 'api/data-points';

    constructor(private http: HttpClient) { }

    create(dataPoint: DataPoint): Observable<EntityResponseType> {
        const copy = this.convert(dataPoint);
        return this.http.post<DataPoint>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(dataPoint: DataPoint): Observable<EntityResponseType> {
        const copy = this.convert(dataPoint);
        return this.http.put<DataPoint>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DataPoint>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DataPoint[]>> {
        const options = createRequestOption(req);
        return this.http.get<DataPoint[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DataPoint[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DataPoint = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DataPoint[]>): HttpResponse<DataPoint[]> {
        const jsonResponse: DataPoint[] = res.body;
        const body: DataPoint[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DataPoint.
     */
    private convertItemFromServer(dataPoint: DataPoint): DataPoint {
        const copy: DataPoint = Object.assign({}, dataPoint);
        return copy;
    }

    /**
     * Convert a DataPoint to a JSON which can be sent to the server.
     */
    private convert(dataPoint: DataPoint): DataPoint {
        const copy: DataPoint = Object.assign({}, dataPoint);
        return copy;
    }
}
