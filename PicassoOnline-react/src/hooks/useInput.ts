import { useState } from "react"
import { FormControlProps } from "react-bootstrap"

export const useInput = (initValue: string, name: string) => {
    const [value, setValue] = useState<typeof initValue>(initValue)

    return {
        name: name,
        value: value,
        onChange: (e: React.FormEvent<FormControlProps>) => setValue(e.currentTarget.value as string)
    }
}