import { ChangeEvent, FormEvent, useState } from "react"

export const useInput = (initValue : string, name : string) => {
    const [value, setValue] = useState<typeof initValue>(initValue)

    return {
        name: name,
        value: value,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
            console.log(value)
            setValue(e.currentTarget.nodeValue!)
        }
    }
}