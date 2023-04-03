

export enum USER_STATUSES {
    ACTIVE = 1,
    REGISTER_PENDING = 2,
    INACTIVE = 3,
    BANNED = 4,
}


export const isActiveUser = (status: any) => status === USER_STATUSES.ACTIVE;
export const isBannedUser = (status: any) => status === USER_STATUSES.BANNED;