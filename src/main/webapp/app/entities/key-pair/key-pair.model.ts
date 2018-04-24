import { BaseEntity } from './../../shared';

export class KeyPair implements BaseEntity {
    constructor(
        public id?: number,
        public pairType?: string,
        public keyName?: string,
        public keyValue?: string,
        public trackMetricQuestion?: BaseEntity,
    ) {
    }
}
