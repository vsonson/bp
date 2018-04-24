import { BaseEntity } from './../../shared';

export class TrackMetric implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public trackIcon?: string,
        public infoBubbleContentType?: string,
        public infoBubble?: any,
        public questions?: BaseEntity[],
    ) {
    }
}
