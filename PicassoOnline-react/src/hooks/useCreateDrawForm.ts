import { useConnectorHandler } from "../connector/connector";
import { setCreationInfo, setUserName } from "../store/appSlicer";
import { useAppDispatch } from "../store/hooks";
import { useInput } from "./useInput"

export const useCreateDrawForm = () => {
    const drawNameInput = useInput("", "name");
    const dispatch = useAppDispatch();
    const { create, createUser } = useConnectorHandler();

    const submitHandle = async (e: React.FormEvent) => {
        e.preventDefault();

        createUser(drawNameInput.value, "owner");
        var result = await create();

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