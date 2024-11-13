import { Col, Row } from "react-bootstrap"
import { DrawBoardPreview } from "./DrawBoardPreview"

export const ActiveDrawBoardList = () => {

    return (
        <>
            <Row className="*:pb-2 text-center">
                {
                    [...Array(5).keys()].map(i => {
                        return (
                            <>
                                <Col sm={6} md={6} lg={6} className="border-1 rounded-md m-auto">
                                    <Row className="p-2">
                                        <span className="text-xl">Микола{i}</span>
                                    </Row>
                                    <Row>
                                        <DrawBoardPreview />
                                    </Row>
                                </Col>
                            </>
                        )
                    })
                }
            </Row>
        </>
    )
}