import { ActionTypes } from "../types/BroadcastActionTypes";
import { PencilTypes } from "../types/enums"
import { Pencil } from "./usePencilChanger";

export const useEraiserPencil = (): Pencil => {
    const PENCIL_TYPE = PencilTypes.ERAISER_PENCIL;
    const ACTION_TYPE = ActionTypes.ERASER;
    const draw = () => {

    }

    return {
        PENCIL_TYPE,
        ACTION_TYPE,
        draw
    }
}