import { Button, Col, Form, Row } from "react-bootstrap"
import { CreateDrawForm } from "../components/CreateDrawForm"
import { DrawBoardPreview } from "../components/DrawBoardPreview"
import { ActiveDrawBoardList } from "../components/ActiveDrawBoardList"
import { useAppSelector } from "../store/hooks"
import { Link } from "react-router-dom"

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
                                <DrawBoardPreview base64Image={appData.boardData.base64Image} connId={appData.appUser.connId} />
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <h2>Підключитися</h2>
                            </Row>
                            <Row>
                                <Form onSubmit={() => { }} className="border-2 px-2 py-4 border-yellow-950">
                                    <Form.Group className="">
                                        <Form.Control type="input" className="mb-2" placeholder="Ідентифікатор малювалки" />
                                    </Form.Group>
                                    <Form.Group className="text-center">
                                        <Link
                                            to={`draw/${"hevdwvehd"}`}
                                            className="mt-2"
                                        >
                                            <Button
                                                type="submit"
                                                className={"w-1/2"}
                                            >
                                                Приєднатися {"ehdwjedbhwbed"?.substring(0, 5)}
                                            </Button>
                                        </Link>
                                    </Form.Group>
                                </Form>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col className="" md={7}>
                    <ActiveDrawBoardList boards={appData.appUser.boards} />
                </Col>
            </Row>
        </>
    )
}