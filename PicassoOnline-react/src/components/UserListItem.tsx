import { Col, Row } from "react-bootstrap"
import { Person, Star, Trash3 } from "react-bootstrap-icons"

interface UserListItemProps {
    isOwner: boolean
}

export const UserListItem = ({ isOwner }:UserListItemProps) => {

    return (
        <>
            <Row className="text-center *:py-2 border-1 rounded-lg my-1 shadow-md bg-pink-300">
                <Col md={1}>
                    {
                        isOwner ?
                            <Star size={20} color="yellow" className="inline" />
                        :
                            <Person size={20} color="blue" />
                    }
                </Col>
                <Col>
                    <span className="font-mono text-lg">
                        Микола
                    </span>
                </Col>
                <Col md={2}>
                    {
                        isOwner ?
                        "" 
                        :
                        <Trash3 size={20} className="inline" />
                    }
                </Col>
            </Row>
        </>
    )
}