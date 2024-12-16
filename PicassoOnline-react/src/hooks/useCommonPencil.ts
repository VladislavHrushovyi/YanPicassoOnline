import { PencilTypes } from "../types/enums";
import { Pencil } from "./usePencilChanger";

export const useCommonPencil = (): Pencil => {

    const PENCIL_TYPE = PencilTypes.COMMON_PENCIL;

    const draw = () => {

    }

    return {
        PENCIL_TYPE,
        draw
    }
}