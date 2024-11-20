import { connector } from "../connector/connector";
import { setDrawboardName } from "../store/appSlicer";
import { useAppDispatch } from "../store/hooks";
import { useInput } from "./useInput"

export const useCreateDrawForm = () => {
    const drawNameInput = useInput("", "name");
    const dispatch = useAppDispatch();
    const submitHandle = (e : React.FormEvent) => {
        e.preventDefault();

        connector.invoke("Create", drawNameInput.value)
        .then(res => {
            if(res !== ''){
                dispatch(setDrawboardName(res as string))
            }
        })
    }

    return {
        drawNameInput,
        submitHandle
    }
}