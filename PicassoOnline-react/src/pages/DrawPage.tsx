import { Col, Row } from "react-bootstrap"
import { DrawToolbox } from "../components/DrawToolbox"
import { DrawField } from "../components/DrawField"
import { UserInDrawList } from "../components/UserInDrawList"
import { useParams } from "react-router-dom"
import { useCanvas } from "../hooks/useCanvas"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useConnectorHandler } from "../connector/connector"
import { setBase64Image, setBoardData, setBoardUsers } from "../store/appSlicer"
import { appApiHandlers } from "../axios/axiosClient"

export const DrawPage = () => {
    const drawBoardQueryName = useParams<{ drawBoardname: string | undefined }>();
    const canvas = useCanvas();
    const appSelector = useAppSelector(x => x.app)
    const dispatch = useAppDispatch()
    const { addUserToDrawBoard, getUsersFromDrawField } = useConnectorHandler()
    const { getDrawBoardState } = appApiHandlers()
    const { colorPicker, pencilHandler, thinknessHandler } = canvas.toolbox;

    console.log(appSelector.appUser)

    useEffect(() => {
        const drawboardId = drawBoardQueryName.drawBoardname as string

        const attachUserToDrawBoard = async (drawBoardId: string, name: string) => {
            const result = await addUserToDrawBoard(drawBoardId, name);
            const base64 = await getDrawBoardState(result.detailedDataId);
            result.base64Image = base64.data.base64Image;
            console.log(result.base64Image)
            dispatch(setBoardData(result))
        }
        const updateDrawBoardState = async (dataId: string) => {
           const result = await getDrawBoardState(dataId);
           dispatch(setBase64Image(result.data.base64Image)) 
        }
        if(appSelector.appUser.connId === drawboardId){
            const currentDrawBoard = structuredClone(appSelector.boardData);
            currentDrawBoard.connId = drawboardId;
            currentDrawBoard.detailedDataId = appSelector.appUser.userBoard.detailedInfoId;
            currentDrawBoard.base64Image = appSelector.appUser.userBoard.base64Image;
            dispatch(setBoardData(currentDrawBoard));
        }
        else if(appSelector.boardData.connId !== drawboardId){
            attachUserToDrawBoard(drawboardId, appSelector.appUser.name)
        }else{
            updateDrawBoardState(appSelector.boardData.detailedDataId)
        }

        const userBoardFetcher = setInterval(() => {
            const users = getUsersFromDrawField(drawboardId)
            users.then((data) => {
                dispatch(setBoardUsers(data))
            })
        }, 2500)

        return () => {
            clearInterval(userBoardFetcher);
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