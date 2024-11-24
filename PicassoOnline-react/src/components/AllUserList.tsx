import { Stack } from "react-bootstrap"
import { UserListItem } from "./UserListItem"

export const AllUserList = () =>{
    
    return (
        <>
            <Stack>
            {
                [...Array(5).keys()].map(i => <UserListItem name={`Микола${i}`} isOwner={false} isAdministratible={true} />)
            }
            </Stack>
        </>
    )
}