import { Button, Col, Form, Row } from "react-bootstrap"
import { EraserFill, Eyedropper, PencilFill } from "react-bootstrap-icons"
import { HexColorPicker } from "react-colorful"
import { PencilChanger } from "../hooks/usePencilChanger"
import { ColorPicker } from "../hooks/useColorPicker"
import { PencilTypes } from "../types/enums"
import { ThinknessHandler } from "../hooks/useThicknessChanger"

interface DrawToolboxProps {
    colorPickerHook: ColorPicker,
    pencilHandler: PencilChanger,
    thinknessHandler: ThinknessHandler,
    clearField: (() => void)
}

export const DrawToolbox = ({ colorPickerHook, pencilHandler, thinknessHandler, clearField }: DrawToolboxProps) => {
    return (
        <>
            <Row>
                <HexColorPicker {...colorPickerHook} style={{ width: "100%", padding: "0" }} />
            </Row>
            <Row md={12} className="w-full">
                <Col className="text-center *:mx-2">
                    <Button
                        onClick={() => pencilHandler.changeActivePencil(PencilTypes.COMMON_PENCIL)}
                        variant={`${pencilHandler.activePencil.PENCIL_TYPE === PencilTypes.COMMON_PENCIL ? "success" : ""}`}
                        className={`border-2 p-2 bg-cyan-300`}
                    >
                        <PencilFill size={20} color={`${colorPickerHook.color}`} />
                    </Button>
                    <Button
                        onClick={() => pencilHandler.changeActivePencil(PencilTypes.ERAISER_PENCIL)}
                        variant={`${pencilHandler.activePencil.PENCIL_TYPE === PencilTypes.ERAISER_PENCIL ? "success" : ""}`}
                        className="border-2 p-2 bg-cyan-300"
                    >
                        <EraserFill size={20} />
                    </Button>
                    <Button
                        onClick={() => pencilHandler.changeActivePencil(PencilTypes.EYEDROPPER_PENCIL)}
                        variant={`${pencilHandler.activePencil.PENCIL_TYPE === PencilTypes.EYEDROPPER_PENCIL ? "success" : ""}`}
                        className="border-2 p-2 bg-cyan-300"
                    >
                        <Eyedropper size={20} />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Range min={thinknessHandler.min} max={thinknessHandler.max} value={thinknessHandler.value} onChange={thinknessHandler.onChange} />
                </Col>
                <Col md={2}>
                    <Form.Label >{thinknessHandler.value}px</Form.Label>
                </Col>
            </Row>
            <Row>
                <Button onClick={clearField}>
                    ОЧИСТИТИ
                </Button>
            </Row>
        </>
    )
}