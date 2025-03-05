import { useConnectorHandler } from "../connector/connector";
import { setCreationInfo, setUserName } from "../store/appSlicer";
import { useAppDispatch } from "../store/hooks";
import { useInput } from "./useInput"

export const useCreateDrawForm = () => {
    const drawNameInput = useInput("", "name");
    const dispatch = useAppDispatch();
    const { create } = useConnectorHandler();

    const submitHandle = (e: React.FormEvent) => {
        e.preventDefault();
        var result = create(drawNameInput.value);

        result.then(res => {
            if (res) {
                dispatch(setUserName(drawNameInput.value))
                dispatch(setCreationInfo(res))
            }
        })
    }

    return {
        drawNameInput,
        submitHandle
    }
}