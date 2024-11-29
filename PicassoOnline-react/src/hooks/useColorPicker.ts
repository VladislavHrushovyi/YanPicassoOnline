import { useState } from "react"

export interface ColorPicker {
    color: string, 
    onChange: ((color: string) => void)
}

export const useColorPicker = () => {
    const [color, setColor] = useState<string>("#0000000")

    const onChange = (color: string) => {
        setColor(_ => color)
    }

    return {
        color: color,
        onChange: onChange
    }
}