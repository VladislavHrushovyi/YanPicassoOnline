import { Col, Row } from "react-bootstrap"
import { CreateDrawForm } from "../components/CreateDrawForm"
import { DrawBoardPreview } from "../components/DrawBoardPreview"
import { ActiveDrawBoardList } from "../components/ActiveDrawBoardList"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { ConnectingForm } from "../components/ConnectingForm"
import { useConnectorHandler } from "../connector/connector"
import { useEffect } from "react"
import { setAppUser, setConnectedDrawBoards } from "../store/appSlicer"
import { appApiHandlers } from "../axios/axiosClient"

export const MainPage = () => {

    const { getDrawBoardState} = appApiHandlers();
    const appData = useAppSelector(x => x.app)
    const dispatch = useAppDispatch();
    const { isConnecting, connector, getConnectedDrwawField } = useConnectorHandler();

    useEffect(() => {
        if (!connector) return;
        const getData = async () => {
            const data = await getConnectedDrwawField();
            dispatch(setConnectedDrawBoards(data));
        }
        const getDrawBoardData = async () => {
            const data = await getDrawBoardState(appData.appUser.userBoard.detailedInfoId);
            const currentAppUser = structuredClone(appData.appUser);
            currentAppUser.userBoard.base64Image = data.data.base64Image;

            dispatch(setAppUser(currentAppUser));

        }
        getDrawBoardData()
        const interval = setInterval(() => {
            getData();
        }, 2000);

        return () => clearInterval(interval);
    }, [appData.appUser.connId, isConnecting])

    return (
        <>
            <Row className="px-8 py-4">
                <Col md={4} className="mr-3">
                    {
                        !appData.appUser.connId &&
                        <>
                            <Row className="">
                                <CreateDrawForm />
                            </Row>
                        </>
                    }
                    {
                        appData.appUser.connId &&
                        <>
                            <Row className="text-center pt-14">
                                <Col>
                                    <Row className="items-center">
                                        <h2>{appData.appUser.name}</h2>
                                    </Row>
                                    <Row>
                                        <DrawBoardPreview base64Image={appData.appUser.userBoard.base64Image} connId={appData.appUser.connId} />
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ConnectingForm />
                                </Col>
                            </Row>
                        </>
                    }
                </Col>
                <Col className="" md={7}>
                    <ActiveDrawBoardList boards={appData.appUser.boards} />
                </Col>
            </Row>
        </>
    )
}