import { PencilTypes } from "../types/enums"
import { Pencil } from "./usePencilChanger";

export const useEraiserPencil = (): Pencil => {
    const PENCIL_TYPE = PencilTypes.ERAISER_PENCIL;

    const draw = () => {

    }

    return {
        PENCIL_TYPE,
        draw
    }
}