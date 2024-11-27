import { Button, Col, Form, Row } from "react-bootstrap"
import { EraserFill, Eyedropper, PencilFill } from "react-bootstrap-icons"
import { HexColorPicker } from "react-colorful"
export const DrawToolbox = () => {

    return (
        <>
            <Row>
                <HexColorPicker style={{ width: "100%", padding: "0" }} />
            </Row>
            <Row md={12} className="w-full">
                <Col className="text-center *:mx-2">
                    <Button
                        variant="outlined"
                        className="border-2 p-2 bg-cyan-300"
                    >
                        <PencilFill size={20} className="" />
                    </Button>
                    <Button
                        variant="outlined"
                        className="border-2 p-2 bg-cyan-300"
                    >
                        <EraserFill size={20} />
                    </Button>
                    <Button
                        variant="outlined"
                        className="border-2 p-2 bg-cyan-300"
                    >
                        <Eyedropper size={20} />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Range min={1} max={50} value={100} />
                </Col>
                <Col md={2}>
                    <Form.Label >{24}px</Form.Label>
                </Col>
            </Row>
            <Row>
                <Button>
                    ОЧИСТИТИ
                </Button>
            </Row>
        </>
    )
}