import { BaseEntity } from './../../shared';

export class QuoteOfTheDay implements BaseEntity {
    constructor(
        public id?: number,
        public author?: string,
        public quoteText?: string,
        public userInfos?: BaseEntity[],
    ) {
    }
}
