import { Col, Row } from "react-bootstrap"
import { DrawToolbox } from "../components/DrawToolbox"

export const DrawPage = () => {
    return (
        <>
            <Row>
                <Col md={8} className="border-2">

                </Col>
                <Col md={4} className="border-2">
                    <DrawToolbox />
                </Col>
            </Row>
        </>
    )
}