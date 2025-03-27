import { Col, Row } from "react-bootstrap"
import { DrawBoardPreview } from "./DrawBoardPreview"
import { InitialBoardData } from "../connector/types/responseTypes";

interface ActiveDrawBoardListProps {
    boards: InitialBoardData[]
}


export const ActiveDrawBoardList = ({ boards } : ActiveDrawBoardListProps) => {
    
    return (
        <>
            <Row className="*:pb-2 text-center">
                {
                    boards?.map(i => {
                        if (i.owner == null) {
                            return;
                        }
                        return (
                            <>
                                <Col key={Math.random()} sm={6} md={6} lg={6} className="border-1 rounded-md m-auto">
                                    <Row className="p-2">
                                        <span className="text-xl">{i.owner}</span>
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