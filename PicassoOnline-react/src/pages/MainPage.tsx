import { Col, Row } from "react-bootstrap"
import { CreateDrawForm } from "../components/CreateDrawForm"
import { DrawBoardPreview } from "../components/DrawBoardPreview"
import { ActiveDrawBoardList } from "../components/ActiveDrawBoardList"

export const MainPage = () => {
    return (
        <>
            <Row className="px-8 py-4">
                <Col md={4} className="mr-3">
                    <Row className="">
                        <CreateDrawForm />
                    </Row>
                    <Row className="text-center pt-14">
                        <DrawBoardPreview />
                    </Row>
                </Col>
                <Col className="" md={7}>
                    <ActiveDrawBoardList />
                </Col>
            </Row>
        </>
    )
}