import { useState } from "react"

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