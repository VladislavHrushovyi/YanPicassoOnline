import { useInput } from "./useInput"

export const useConnectingForm = () => {

    const codeInput = useInput("", "code")

    return {
        codeInput: codeInput,
    }
}