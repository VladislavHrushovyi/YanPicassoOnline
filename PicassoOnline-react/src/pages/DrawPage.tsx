import { Col, Row } from "react-bootstrap"
import { DrawToolbox } from "../components/DrawToolbox"
import { DrawField } from "../components/DrawField"
import { UserInDrawList } from "../components/UserInDrawList"
import { useParams } from "react-router-dom"
import { useToolbox } from "../hooks/useToolbox"
import { useCanvas } from "../hooks/useCanvas"
import { useRef } from "react"

export const DrawPage = () => {
    const drawBoardQueryName = useParams();
    const canvas = useCanvas()
    const { colorPicker, pencilHandler, thinknessHandler } = canvas.toolbox;
    return (
        <>
            <Row>
                <Col sm={12} xs={12} md={7} className="border-2">
                    <DrawField 
                        setRef={canvas.setRef}
                        draw={canvas.draw} 
                        start={canvas.start} 
                        stop={canvas.stop} 
                        pencilPayload={{hexColor:colorPicker.color, lineWidth:thinknessHandler.value}} />
                </Col>
                <Col md={3}  className="border-2 py-10 px-5 *:mb-2">
                    <DrawToolbox 
                        colorPickerHook={colorPicker} 
                        pencilHandler={pencilHandler} 
                        thinknessHandler={thinknessHandler} 
                        clearField={canvas.clearField}
                        />
                </Col>
                <Col md={2}  className="border-2">
                    <UserInDrawList />
                </Col>
            </Row>
        </>
    )
}