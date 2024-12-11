import { Stack } from "react-bootstrap"
import { UserListItem } from "./UserListItem"
import { useEffect, useState } from "react"
import { getUsersFromDrawField } from "../connector/connector"
import { useAppSelector } from "../store/hooks"

export interface UsersDrawField {
    Owner: string,
    UsersName: string[]
}

export const UserInDrawList = () => {
    const [users, setUsers] = useState<UsersDrawField>()
    const connId = useAppSelector(x => x.appReducer.drawboardName)
    useEffect(() => {
        const fetchUsers = () => {
            setInterval(() => {
                getUsersFromDrawField(connId).then(res => console.log(res))
            }, 2000)
        }

        fetchUsers();
    }, [])
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