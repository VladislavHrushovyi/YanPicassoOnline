import { Col, Row } from "react-bootstrap"
import { AllUserList } from "../components/AllUserList"
import { ActiveDrawBoardList } from "../components/ActiveDrawBoardList"
import { useConnectorHandler } from "../connector/connector";
import { useEffect } from "react";

export const AdminPage = () => {
    const {getUserList} = useConnectorHandler();
    useEffect(() => {
        const getAllUserInfo = () => {
            getUserList();
        }

       setInterval(() => {
        getAllUserInfo();
       }, 5000)
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