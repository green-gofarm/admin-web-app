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
}