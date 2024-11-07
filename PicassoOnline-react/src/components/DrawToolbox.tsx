import { Button, Form, Row } from "react-bootstrap"
import { EraserFill, Eyedropper, PencilFill } from "react-bootstrap-icons"
import { HexColorPicker } from "react-colorful"
export const DrawToolbox = () => {

    return (
        <>
            <Row>
                <HexColorPicker style={{ width: "100%" }} />
            </Row>
            <Row md={6} className="w-full">
                <Button >
                    <PencilFill size={20} />
                </Button>
                <Button>
                    <EraserFill size={20} />
                </Button>
                <Button>
                    <Eyedropper size={20} />
                </Button>
            </Row>
            <Row>
                <Form.Label >{24}px</Form.Label>
                <Form.Range min={1} max={50} value={100} />
            </Row>
            <Row>
                <Button>
                    ОЧИСТИТИ
                </Button>
            </Row>
        </>
    )
}