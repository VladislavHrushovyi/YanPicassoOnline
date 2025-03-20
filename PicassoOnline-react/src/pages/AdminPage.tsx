import { Col, Row } from "react-bootstrap"
import { AllUserList } from "../components/AllUserList"
import { ActiveDrawBoardList } from "../components/ActiveDrawBoardList"
import { useConnectorHandler } from "../connector/connector";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { setAdminAllBoardList, setAdminAllUserList } from "../store/appSlicer";

export const AdminPage = () => {
    
    const { getUserList, getDrawboards} = useConnectorHandler()
    const dispatch = useAppDispatch()
    useEffect(() => {
        const getAllUserInfo = async () => {
            const userList = await getUserList()
            dispatch(setAdminAllUserList(userList))
        }

        const getAllDrawBoards = async () => {
            const drawBoards = await getDrawboards()
            console.log(drawBoards)
            dispatch(setAdminAllBoardList(drawBoards))
        }

        const getAllInfo = setInterval(async () => {
            await getAllUserInfo();
            await getAllDrawBoards()
        }, 5000)
        return () => {
            clearInterval(getAllInfo)
        }
    }, [])

    return (
        <>
            <Row>
                <Col md={4} className="mr-4">
                    <AllUserList />
                </Col>
                <Col md={7}>
                    <ActiveDrawBoardList />
                </Col>
            </Row>
        </>
    )
}