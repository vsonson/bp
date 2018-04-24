import { BaseEntity, User } from './../../shared';

export const enum UserStatus {
    'ACTIVE',
    'INVITED',
    'DISABLED',
    'ACTIVEPAID'
}

export const enum UserType {
    'STUDENTATHLETE',
    'ADMIN',
    'SUPPORTER'
}

export class UserInfo implements BaseEntity {
    constructor(
        public id?: number,
        public userstatus?: UserStatus,
        public userType?: UserType,
        public yearOfBirth?: string,
        public gender?: string,
        public primarySport?: string,
        public educationLevel?: string,
        public countryCode?: string,
        public stateCode?: string,
        public lastQuoteDate?: any,
        public lastQuoteId?: number,
        public user?: User,
        public quoteOfTheDays?: BaseEntity[],
    ) {
    }
}
