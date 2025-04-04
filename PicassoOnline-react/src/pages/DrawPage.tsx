import { Col, Row } from "react-bootstrap"
import { DrawToolbox } from "../components/DrawToolbox"
import { DrawField } from "../components/DrawField"
import { UserInDrawList } from "../components/UserInDrawList"
import { useParams } from "react-router-dom"
import { useCanvas } from "../hooks/useCanvas"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useConnectorHandler } from "../connector/connector"
import { setBoardData, setBoardUsers } from "../store/appSlicer"

export const DrawPage = () => {
    const drawBoardQueryName = useParams<{ drawBoardname: string | undefined }>();
    const canvas = useCanvas();
    const appSelector = useAppSelector(x => x.app)
    const dispatch = useAppDispatch()
    const { addUserToDrawBoard, getUsersFromDrawField } = useConnectorHandler()
    const { colorPicker, pencilHandler, thinknessHandler } = canvas.toolbox;

    useEffect(() => {
        const drawboardId = drawBoardQueryName.drawBoardname as string
        if(appSelector.boardData.connId !== drawboardId){ //check by conn-id
            console.log(`Adding user to drawboard ${appSelector.appUser.name}`)
            addUserToDrawBoard(drawboardId, appSelector.appUser.name)
            .then((data) => {
                console.log(data)
                dispatch(setBoardData(data))
            })
        }

        const userBoardFetcher = setInterval(() => {
            const users = getUsersFromDrawField(drawboardId)
            users.then((data) => {
                dispatch(setBoardUsers(data))
            })
        }, 2500)

        return () => {
            clearInterval(userBoardFetcher)
        }
    }, [])
    return (
        <>
            <Row>
                <Col sm={12} xs={12} md={7} className="border-2">
                    <DrawField
                        connId={drawBoardQueryName.drawBoardname as string}
                        setRef={canvas.setRef}
                        draw={canvas.draw}
                        start={canvas.start}
                        stop={canvas.stop}
                        pencilPayload={{ hexColor: colorPicker.color, lineWidth: thinknessHandler.value }}
                        getColorByClick={canvas.getColorByClick}
                    />
                </Col>
                <Col md={3} className="border-2 py-10 px-5 *:mb-2">
                    <DrawToolbox
                        colorPickerHook={colorPicker}
                        pencilHandler={pencilHandler}
                        thinknessHandler={thinknessHandler}
                        clearField={canvas.clearField}
                    />
                </Col>
                <Col md={2} className="border-2">
                    <UserInDrawList />
                </Col>
            </Row>
        </>
    )
}