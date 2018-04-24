import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { QuoteOfTheDay } from './quote-of-the-day.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<QuoteOfTheDay>;

@Injectable()
export class QuoteOfTheDayService {

    private resourceUrl =  SERVER_API_URL + 'api/quote-of-the-days';

    constructor(private http: HttpClient) { }

    create(quoteOfTheDay: QuoteOfTheDay): Observable<EntityResponseType> {
        const copy = this.convert(quoteOfTheDay);
        return this.http.post<QuoteOfTheDay>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(quoteOfTheDay: QuoteOfTheDay): Observable<EntityResponseType> {
        const copy = this.convert(quoteOfTheDay);
        return this.http.put<QuoteOfTheDay>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<QuoteOfTheDay>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<QuoteOfTheDay[]>> {
        const options = createRequestOption(req);
        return this.http.get<QuoteOfTheDay[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<QuoteOfTheDay[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: QuoteOfTheDay = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<QuoteOfTheDay[]>): HttpResponse<QuoteOfTheDay[]> {
        const jsonResponse: QuoteOfTheDay[] = res.body;
        const body: QuoteOfTheDay[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to QuoteOfTheDay.
     */
    private convertItemFromServer(quoteOfTheDay: QuoteOfTheDay): QuoteOfTheDay {
        const copy: QuoteOfTheDay = Object.assign({}, quoteOfTheDay);
        return copy;
    }

    /**
     * Convert a QuoteOfTheDay to a JSON which can be sent to the server.
     */
    private convert(quoteOfTheDay: QuoteOfTheDay): QuoteOfTheDay {
        const copy: QuoteOfTheDay = Object.assign({}, quoteOfTheDay);
        return copy;
    }
}
