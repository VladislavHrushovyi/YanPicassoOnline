import { Col, Row } from "react-bootstrap"
import { DrawToolbox } from "../components/DrawToolbox"
import { DrawField } from "../components/DrawField"
import { UserInDrawList } from "../components/UserInDrawList"
import { useParams } from "react-router-dom"
import { useToolbox } from "../hooks/useToolbox"

export const DrawPage = () => {
    const drawBoardQueryName = useParams();
    const { colorPicker, pencilHandler } = useToolbox();
    return (
        <>
            <Row>
                <Col sm={12} xs={12} md={7} className="border-2">
                    <DrawField />
                </Col>
                <Col md={3}  className="border-2 py-10 px-5 *:mb-2">
                    <DrawToolbox colorPickerHook={colorPicker} pencilHandler={pencilHandler} />
                </Col>
                <Col md={2}  className="border-2">
                    <UserInDrawList />
                </Col>
            </Row>
        </>
    )
}