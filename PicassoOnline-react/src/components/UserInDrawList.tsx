import { Stack } from "react-bootstrap"
import { UserListItem } from "./UserListItem"
import { useAppSelector } from "../store/hooks"

export const UserInDrawList = () => {
    const appData = useAppSelector(x => x.app)
    const appUserName = appData.appUser.name
    return (
        <>
            <Stack className="w-full p-0">
               {
                appData.boardData.users.map(user => { 
                    return <UserListItem key={Math.random()} name={`${user.name}`} isOwner={user.role === "owner"} isAdministratible={user.name === appUserName} />
                })
               }
            </Stack>
        </>
    )
}