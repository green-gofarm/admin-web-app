import { UserState } from './user/reducer';
import { OrderState } from './order/reducer';
import { TagState } from './tag/reducer';
import { FarmstayState } from "./farmstay/reducer";
import { RoomState } from "./room/reducer";
import { ServiceState } from "./service/reducer";

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

    farmstay: FarmstayState;

    service: ServiceState;

    room: RoomState;

    feedback: {
        feedbacks: any
    };

    user: UserState;

    order: OrderState;

    tag: TagState;
}