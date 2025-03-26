export enum ActionTypes {
    PENCIL = "PENCIL",
    ERASER = "ERASER"
}

export interface RootAction {
    type: ActionTypes;
    data: string
}