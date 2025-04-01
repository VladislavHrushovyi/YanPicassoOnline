export enum ActionTypes {
    PENCIL = "PENCIL",
    ERASER = "ERASER",
    EYEDROPPER = "EYEDROPPER",
}

export interface RootAction {
    type: ActionTypes;
    data: string
}