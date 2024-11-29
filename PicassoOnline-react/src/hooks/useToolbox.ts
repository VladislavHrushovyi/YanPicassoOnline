import { useColorPicker } from "./useColorPicker"
import { usePencilChanger } from "./usePencilChanger";

export const useToolbox = () => {
    const colorPicker = useColorPicker();
    const pencilHandler = usePencilChanger();
    return {
        colorPicker,
        pencilHandler
    }
}