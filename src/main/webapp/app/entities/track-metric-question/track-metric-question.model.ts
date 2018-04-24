import { BaseEntity } from './../../shared';

export class TrackMetricQuestion implements BaseEntity {
    constructor(
        public id?: number,
        public question?: string,
        public isMandatory?: boolean,
        public answerOptions?: BaseEntity[],
        public trackMetric?: BaseEntity,
    ) {
        this.isMandatory = false;
    }
}
