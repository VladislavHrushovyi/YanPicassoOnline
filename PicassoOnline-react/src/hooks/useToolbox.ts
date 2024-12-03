import { useColorPicker } from "./useColorPicker"
import { usePencilChanger } from "./usePencilChanger";
import { useThicknessChanger } from "./useThicknessChanger";

export const useToolbox = () => {
    const colorPicker = useColorPicker();
    const pencilHandler = usePencilChanger();
    const thinknessHandler = useThicknessChanger(1, 25, 12);

    return {
        colorPicker,
        pencilHandler,
        thinknessHandler,
    }
}