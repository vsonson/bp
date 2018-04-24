import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { KeyPair } from './key-pair.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<KeyPair>;

@Injectable()
export class KeyPairService {

    private resourceUrl =  SERVER_API_URL + 'api/key-pairs';

    constructor(private http: HttpClient) { }

    create(keyPair: KeyPair): Observable<EntityResponseType> {
        const copy = this.convert(keyPair);
        return this.http.post<KeyPair>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(keyPair: KeyPair): Observable<EntityResponseType> {
        const copy = this.convert(keyPair);
        return this.http.put<KeyPair>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<KeyPair>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<KeyPair[]>> {
        const options = createRequestOption(req);
        return this.http.get<KeyPair[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<KeyPair[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: KeyPair = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<KeyPair[]>): HttpResponse<KeyPair[]> {
        const jsonResponse: KeyPair[] = res.body;
        const body: KeyPair[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to KeyPair.
     */
    private convertItemFromServer(keyPair: KeyPair): KeyPair {
        const copy: KeyPair = Object.assign({}, keyPair);
        return copy;
    }

    /**
     * Convert a KeyPair to a JSON which can be sent to the server.
     */
    private convert(keyPair: KeyPair): KeyPair {
        const copy: KeyPair = Object.assign({}, keyPair);
        return copy;
    }
}
