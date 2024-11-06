import { Col, Row } from "react-bootstrap"
import { DrawBoardPreview } from "./DrawBoardPreview"

export const ActiveDrawBoardList = () => {

    return (
        <>
            <Row className="*:pb-2">
                <Col sm={6} md={6} lg={6} className="">
                    <DrawBoardPreview />
                </Col>
                <Col sm={6} md={6} lg={6}>
                    <DrawBoardPreview />
                </Col>
                <Col sm={6} md={6} lg={6}>
                    <DrawBoardPreview />
                </Col>
                <Col sm={6} md={6} lg={6}>
                    <DrawBoardPreview />
                </Col>
                <Col sm={6} md={6} lg={6}>
                    <DrawBoardPreview />
                </Col>
                <Col sm={6} md={6} lg={6}>
                    <DrawBoardPreview />
                </Col>
            </Row>
        </>
    )
}