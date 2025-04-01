import { useConnectorHandler } from "../connector/connector";
import { initData } from "../store/appSlicer";
import { useAppDispatch } from "../store/hooks";
import { useInput } from "./useInput"

export const useCreateDrawForm = () => {
    const drawerNameInput = useInput("", "name");
    const dispatch = useAppDispatch();
    const { create, createUser } = useConnectorHandler();

    const submitHandle = async (e: React.FormEvent) => {
        e.preventDefault();
        const userName = drawerNameInput.value;
        const role = "owner";

        const user = await createUser(userName, role);
        const board = await create()

        dispatch(initData({appUser: user, boardData: board}))
    }

    return {
        drawerNameInput,
        submitHandle
    }
}