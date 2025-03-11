import { Stack } from "react-bootstrap"
import { UserListItem } from "./UserListItem"
import { User } from "../connector/types/responseTypes"

export const AllUserList = () => {
    const users = [] as User[]
    
    return (
        <>
            <Stack>
                {
                    users?.map(i => i.name ?
                        <UserListItem name={`${i.name} ${i?.connId.substring(0, 5)}`} isOwner={false} isAdministratible={true} />
                        : "")
                }
            </Stack>
        </>
    )
}