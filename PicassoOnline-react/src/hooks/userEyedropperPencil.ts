import { ActionTypes } from "../types/BroadcastActionTypes";
import { PencilTypes } from "../types/enums"
import { Pencil } from "./usePencilChanger";

export const useEyedropperPencil = (): Pencil => {
    const PENCIL_TYPE = PencilTypes.EYEDROPPER_PENCIL;
    const ACTION_TYPE = ActionTypes.EYEDROPPER;
    const draw = () => {

    }

    return {
        PENCIL_TYPE,
        ACTION_TYPE,
        draw
    }
}