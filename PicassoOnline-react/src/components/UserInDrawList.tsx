import { Stack } from "react-bootstrap"
import { UserListItem } from "./UserListItem"

export const UserInDrawList = () => {

    return (
        <>
            <Stack className="w-full p-0">
                <UserListItem isOwner={true} />
                <UserListItem isOwner={false} />
                <UserListItem isOwner={false} />
                <UserListItem isOwner={false} />
            </Stack>
        </>
    )
}