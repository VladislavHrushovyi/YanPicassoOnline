import { useConnectorHandler } from "../connector/connector";
import { initData } from "../store/appSlicer";
import { useAppDispatch } from "../store/hooks";
import { InitAppData } from "../store/payloadTypes";
import { useInput } from "./useInput"

export const useCreateDrawForm = () => {
    const drawNameInput = useInput("", "name");
    const dispatch = useAppDispatch();
    const { create, createUser } = useConnectorHandler();

    const submitHandle = async (e: React.FormEvent) => {
        e.preventDefault();
        const userName = drawNameInput.value;
        const role = "owner";

        const initAppData = {
            user: {},
            boardData: {}
        } as InitAppData

        createUser(userName, role).then(res => {
            initAppData.user = res

            create().then(res => {
                initAppData.boardData = res
            })
        });

        console.log(initAppData)
        dispatch(initData(initAppData))
    }

    return {
        drawNameInput,
        submitHandle
    }
}