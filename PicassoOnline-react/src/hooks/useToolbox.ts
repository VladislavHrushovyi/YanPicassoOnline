import { useColorPicker } from "./useColorPicker"

export const useToolbox = () => {
    const colorPicker = useColorPicker();

    return {
        colorPicker
    }
}