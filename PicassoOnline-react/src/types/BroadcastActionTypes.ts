export enum ActionTypes {
    PENCIL = "PENCIL",
}

export interface RootAction {
    type: ActionTypes;
    data: string
}