import { useState } from "react"

export interface ThinknessHandler {
    min: number,
    max: number,
    value: number,
    onChange: ((e: React.FormEvent<HTMLInputElement>) => void)
}

export const useThicknessChanger = (min: number, max: number, defaultValue: number): ThinknessHandler => {
    const [value, setValue] = useState<number>(defaultValue)

    const changeNumber = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(Number.parseInt(e.currentTarget.value as string))
    }

    return {
        min: min,
        max: max,
        value: value,
        onChange: changeNumber
    }
}