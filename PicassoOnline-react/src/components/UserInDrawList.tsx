import { Stack } from "react-bootstrap"
import { UserListItem } from "./UserListItem"
import { useAppSelector } from "../store/hooks"

export interface UsersDrawField {
    owner: string,
    usersName: string[]
}

export const UserInDrawList = () => {
    const users = useAppSelector(x => x.appReducer.usersInDrawFiled)
    
    return (
        <>
            <Stack className="w-full p-0">
                {
                    users?.owner && <UserListItem key={Math.random()} name={`${users.owner}`} isOwner={true} isAdministratible={false} />
                }
                {
                    users?.usersName && users.usersName.map(x => <UserListItem key={Math.random()} name={`${x}`} isOwner={false} isAdministratible={false} />)
                }
            </Stack>
        </>
    )
}