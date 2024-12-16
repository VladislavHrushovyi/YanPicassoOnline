import { useState } from "react";
import { useCommonPencil } from "./useCommonPencil"
import { useEraiserPencil } from "./useEraiserPencil";
import { useEyedropperPencil } from "./userEyedropperPencil";
import { PencilTypes } from "../types/enums";

export interface Pencil {
    PENCIL_TYPE: PencilTypes,
    draw: () => void
}

export interface PencilChanger {
    activePencil: Pencil;
    changeActivePencil: (penciltype: PencilTypes) => void;
}

export const usePencilChanger = (): PencilChanger => {

    const [activePencil, setActivePencil] = useState<Pencil>(useCommonPencil())

    const changeActivePencil = (penciltype: PencilTypes) => {
        switch (penciltype) {
            case PencilTypes.COMMON_PENCIL:
                setActivePencil(_ => useCommonPencil())
                break;
            case PencilTypes.ERAISER_PENCIL:
                setActivePencil(_ => useEraiserPencil())
                break;
            case PencilTypes.EYEDROPPER_PENCIL:
                setActivePencil(_ => useEyedropperPencil())
                break;
            default:
                setActivePencil(_ => useCommonPencil())
        }
    }

    return {
        activePencil,
        changeActivePencil
    }
}