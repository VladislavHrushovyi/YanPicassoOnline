import { Stack } from "react-bootstrap"
import { UserListItem } from "./UserListItem"
import { useEffect } from "react"
import { useConnectorHandler } from "../connector/connector"

export const AllUserList = () =>{
    const {getUserList} = useConnectorHandler();
    useEffect(() => {
        const getAllUserInfo = () => {
            getUserList();
        }

        getAllUserInfo();
    }, [])
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