import { Col, Row } from "react-bootstrap"
import { DrawToolbox } from "../components/DrawToolbox"
import { DrawField } from "../components/DrawField"

export const DrawPage = () => {
    return (
        <>
            <Row>
                <Col sm={12} xs={12} md={8} className="border-2">
                    <DrawField />
                </Col>
                <Col className="border-2 py-10 px-5 *:mb-2">
                    <DrawToolbox />
                </Col>
            </Row>
        </>
    )
}