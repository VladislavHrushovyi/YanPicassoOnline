import { Col, Row } from "react-bootstrap"
import { CreateDrawForm } from "../components/CreateDrawForm"
import { DrawBoardPreview } from "../components/DrawBoardPreview"
import { ActiveDrawBoardList } from "../components/ActiveDrawBoardList"
import { useAppSelector } from "../store/hooks"

export const MainPage = () => {
    const appData = useAppSelector(x => x.app)
    console.log(appData)
    return (
        <>
            <Row className="px-8 py-4">
                <Col md={4} className="mr-3">
                    <Row className="">
                        <CreateDrawForm />
                    </Row>
                    <Row className="text-center pt-14">
                        <Col>
                            <Row className="items-center">
                                <h2>{appData.boardData.owner}</h2>
                            </Row>
                            <Row>
                                <DrawBoardPreview base64Image={appData.boardData.base64Image} connId={appData.appUser.connId}/>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col className="" md={7}>
                    <ActiveDrawBoardList boards={appData.appUser.boards}/>
                </Col>
            </Row>
        </>
    )
}