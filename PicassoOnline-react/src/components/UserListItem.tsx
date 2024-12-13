import { Button, Col, Row } from "react-bootstrap"
import { Gear, Person, Star, Trash3 } from "react-bootstrap-icons"
import { Administratible } from "../types/AdminRoot"

interface UserListItemProps extends Administratible {
    isOwner: boolean,
    name: string
}

export const UserListItem = ({ isOwner, name, isAdministratible = false }: UserListItemProps) => {

    return (
        <>
            <Row className="text-center *:py-2 border-1 rounded-lg my-1 shadow-md bg-pink-300">
                <Col md={2}>
                    {
                        isOwner ?
                            <Star size={20} color="yellow" className="inline" />
                            :
                            <Person size={20} color="blue" className="inline" />
                    }
                </Col>
                <Col>
                    <span className="font-mono text-lg tracking-widest inline">
                        {name}
                    </span>
                </Col>
                <Col md={3}>
                    {
                        isAdministratible ?
                            <Button variant="outlined">
                                <Gear size={20} />
                            </Button>
                            :
                            isOwner ?
                                ""
                                :
                                <Button variant="outlined py-1 m-0">
                                    <Trash3 className="inline p-0 m-0" />
                                </Button>
                    }
                </Col>
            </Row>
        </>
    )
}