import { useState } from "react"

export const useInput = (initValue: string, name: string) => {
    const [value, setValue] = useState<typeof initValue>(initValue)

    return {
        name: name,
        value: value,
        onChange: (e:  React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value as string)
    }
}