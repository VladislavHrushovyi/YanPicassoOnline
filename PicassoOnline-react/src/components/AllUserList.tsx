import { Stack } from "react-bootstrap"
import { UserListItem } from "./UserListItem"
import { useAppSelector } from "../store/hooks"

export const AllUserList = () =>{
    const users = useAppSelector(state => state.appReducer.activeUsers)
    return (
        <>
            <Stack>
            {
                users.map(i => <UserListItem name={`${i.name} ${i?.connId.substring(0, 5)}`} isOwner={false} isAdministratible={true} />)
            }
            </Stack>
        </>
    )
}