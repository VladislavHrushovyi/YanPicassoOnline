import { Col, Row } from "react-bootstrap"
import { DrawBoardPreview } from "./DrawBoardPreview"
import { User } from "../connector/types/responseTypes";

export const ActiveDrawBoardList = () => {
    const users = [] as User[];

    // add fetching users
    return (
        <>
            <Row className="*:pb-2 text-center">
                {
                    users?.map(i => {
                        if (i.name == null) {
                            return;
                        }
                        return (
                            <>
                                <Col key={Math.random()} sm={6} md={6} lg={6} className="border-1 rounded-md m-auto">
                                    <Row className="p-2">
                                        <span className="text-xl">{i.name}</span>
                                    </Row>
                                    <Row>
                                        <DrawBoardPreview base64Image={i.base64Image} connId={i.connId} />
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