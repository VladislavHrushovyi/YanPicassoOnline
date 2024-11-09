import { Col, Row } from "react-bootstrap"
import { DrawToolbox } from "../components/DrawToolbox"
import { DrawField } from "../components/DrawField"
import { UserInDrawList } from "../components/UserInDrawList"

export const DrawPage = () => {
    return (
        <>
            <Row>
                <Col sm={12} xs={12} md={7} className="border-2">
                    <DrawField />
                </Col>
                <Col md={3}  className="border-2 py-10 px-5 *:mb-2">
                    <DrawToolbox />
                </Col>
                <Col md={2}  className="border-2">
                    <UserInDrawList />
                </Col>
            </Row>
        </>
    )
}