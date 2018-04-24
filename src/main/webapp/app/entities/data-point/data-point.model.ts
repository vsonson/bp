import { BaseEntity } from './../../shared';

export class DataPoint implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public order?: number,
    ) {
    }
}
