import { Stack } from "react-bootstrap"
import { UserListItem } from "./UserListItem"
import { useAppSelector } from "../store/hooks"

export const AllUserList = () => {
    const appData = useAppSelector(x => x.app)
    
    return (
        <>
            <Stack>
                {
                    appData.adminData.users?.map(i => i.name ?
                        <UserListItem key={Math.random()} name={`${i.name} ${i?.connId.substring(0, 5)}`} isOwner={false} isAdministratible={true} />
                        : "")
                }
            </Stack>
        </>
    )
}