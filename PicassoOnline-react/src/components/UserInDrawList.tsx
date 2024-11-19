import { Stack } from "react-bootstrap"
import { UserListItem } from "./UserListItem"

export const UserInDrawList = () => {

    return (
        <>
            <Stack className="w-full p-0">
                {
                    [...Array(5).keys()].map(i => <UserListItem key={Math.random()} name={`Микола${i}`} isOwner={i === 0} isAdministratible={false} />)
                }
            </Stack>
        </>
    )
}