import { useState } from "react"
import { FormControlProps } from "react-bootstrap"

export interface ThinknessHandler {
    min: number,
    max: number,
    value: number,
    onChange: ((e: React.FormEvent<FormControlProps>) => void)
}

export const useThicknessChanger = (min: number, max: number, defaultValue: number): ThinknessHandler => {
    const [value, setValue] = useState<number>(defaultValue)

    const changeNumber = (e: React.FormEvent<FormControlProps>) => {
        setValue(Number.parseInt(e.currentTarget.value as string))
    }

    return {
        min: min,
        max: max,
        value: value,
        onChange: changeNumber
    }
}