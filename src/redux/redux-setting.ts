export interface IReduxActionOption {
    onSuccess?: Function;
    onFailure?: Function;
    loading?: Function;
}

export class ReduxActionOption implements IReduxActionOption {
    constructor(
        public onSuccess?: Function,
        public onFailure?: Function,
        public loading?: Function
    ) { }
}

export interface IReduxAction {
    type: string,
    payload?: any
}

export interface RootState {
    auth: {
        user: any
    };

    farmstay: {
        farmstays: any,
        allFarmstays: any[],
        farmstayDetail: any,
        activityDetail: any,
        activitySchedule: any
    };

    service: {
        serviceCategories: any
    };

    room: {
        roomCategories: any
    };

    feedback: {
        feedbacks: any
    };

    user: {
        users: any,
        allUsers: any[],
        hosts: any,
        allHosts: any[],
        customers: any,
        allCustomers: any[],
        admins: any,
        allAdmins: any[],
    };

    order: {
        orders: any,
        disbursements: any,
    }
}