import { Col, Row } from "react-bootstrap"
import { AllUserList } from "../components/AllUserList"
import { ActiveDrawBoardList } from "../components/ActiveDrawBoardList"
import { useConnectorHandler } from "../connector/connector";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { setUserName } from "../store/appSlicer";
import { appApiHandlers } from "../axios/axiosClient";
import { User } from "../connector/types/responseTypes";

export const AdminPage = () => {
    const { getUserList } = useConnectorHandler();
    const {getDrawBoardState} = appApiHandlers();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(setUserName("admin"))
        const getAllUserInfo = async () => {
            await getUserList()
                .then(res => {
                    var users = res.map(async (x) => {
                        const user = await getDrawBoardState(x.detailedDataId).then(res => {
                            return {
                                name: x.name,
                                connId: x.connId,
                                base64Image: res.data.base64Image,
                                detailedDataId: x.detailedDataId
                            } as User
                        });
                        return user;
                    });
                    
                    //Promise.all(users).then(users => dispatch(setActiveUsers(users)));
                    
                });
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