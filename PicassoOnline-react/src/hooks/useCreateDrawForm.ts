import { useInput } from "./useInput"

export const useCreateDrawForm = () => {
    const drawNameInput = useInput("", "name");

    const submitHandle = (e : React.FormEvent) => {
        e.preventDefault();

        console.log(drawNameInput.value)
    }

    return {
        drawNameInput,
        submitHandle
    }
}