import { ActionTypes } from "../types/BroadcastActionTypes";
import { PencilTypes } from "../types/enums";
import { Pencil } from "./usePencilChanger";

export const useCommonPencil = (): Pencil => {

    const PENCIL_TYPE = PencilTypes.COMMON_PENCIL;
    const ACTION_TYPE = ActionTypes.PENCIL;

    const draw = () => {

    }

    return {
        PENCIL_TYPE,
        ACTION_TYPE,
        draw
    }
}