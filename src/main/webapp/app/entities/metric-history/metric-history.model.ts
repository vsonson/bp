import { BaseEntity } from './../../shared';

export class MetricHistory implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public metricValue?: string,
        public trackMetric?: BaseEntity,
        public metricQuestion?: BaseEntity,
        public userInfo?: BaseEntity,
    ) {
    }
}
