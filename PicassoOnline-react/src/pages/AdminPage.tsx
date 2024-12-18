import { Col, Row } from "react-bootstrap"
import { AllUserList } from "../components/AllUserList"
import { ActiveDrawBoardList } from "../components/ActiveDrawBoardList"
import { useConnectorHandler } from "../connector/connector";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { setActiveUsers } from "../store/appSlicer";

export const AdminPage = () => {
    const { getUserList } = useConnectorHandler();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getAllUserInfo = () => {
            getUserList()
                .then(res => dispatch(setActiveUsers(res)));
        }

        const getUsers = setInterval(() => {
            getAllUserInfo();
        }, 5000)

        return () => {
            clearInterval(getUsers)
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