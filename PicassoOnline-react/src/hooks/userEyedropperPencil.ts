import { PencilTypes } from "../types/enums"
import { Pencil } from "./usePencilChanger";

export const useEyedropperPencil = (): Pencil => {
    const PENCIL_TYPE = PencilTypes.EYEDROPPER_PENCIL;

    const draw = () => {

    }

    return {
        PENCIL_TYPE,
        draw
    }
}