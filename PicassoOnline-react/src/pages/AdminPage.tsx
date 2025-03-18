import { Col, Row } from "react-bootstrap"
import { AllUserList } from "../components/AllUserList"
import { ActiveDrawBoardList } from "../components/ActiveDrawBoardList"
import { useConnectorHandler } from "../connector/connector";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { appApiHandlers } from "../axios/axiosClient";

export const AdminPage = () => {
    
    
    useEffect(() => {
        const getAllUserInfo = async () => {
            
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