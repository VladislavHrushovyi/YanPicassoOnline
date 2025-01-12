import { Stack } from "react-bootstrap"
import { UserListItem } from "./UserListItem"
import { useEffect, useState } from "react"
import { getUsersFromDrawField } from "../connector/connector"
import { useAppSelector } from "../store/hooks"

export interface UsersDrawField {
    owner: string,
    usersName: string[]
}

export const UserInDrawList = () => {
    const [users, setUsers] = useState<UsersDrawField>()
    const connId = useAppSelector(x => x.appReducer.connId)
    useEffect(() => {
        const fetchUsers = () => {
            setInterval(() => {
                getUsersFromDrawField(connId).then(res => {
                    setUsers(_ => res)
                })
            }, 2000)
        }

        fetchUsers();
    }, [])
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