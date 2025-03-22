import { Col, Row } from "react-bootstrap"
import { AllUserList } from "../components/AllUserList"
import { ActiveDrawBoardList } from "../components/ActiveDrawBoardList"
import { useConnectorHandler } from "../connector/connector";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAdminAllBoardList, setAdminAllUserList, setAppUser } from "../store/appSlicer";

export const AdminPage = () => {
    
    const { getUserList, getDrawboards, createUser} = useConnectorHandler()
    const dispatch = useAppDispatch()
    const appData = useAppSelector(x => x.app)
    console.log("Admin Page", appData.appUser)

    useEffect(() => {

        const createAdminUser = async () => {
            try {
                const res = await createUser("Admin", "admin");
                console.log("Admin User", res);
                dispatch(setAppUser(res));
            } catch (error) {
                console.error("Помилка створення користувача:", error);
            }
        };
    
        createAdminUser();
    }, []);
    
    useEffect(() => {
        if (!appData.appUser.name) return;
    
        const getAllUserInfo = async () => {
            const userList = await getUserList();
            dispatch(setAdminAllUserList(userList));
        };
    
        const getAllDrawBoards = async () => {
            const drawBoards = await getDrawboards();
            console.log(drawBoards);
            dispatch(setAdminAllBoardList(drawBoards));
        };
    
        const getAllInfo = async () => {
            await getAllUserInfo();
            await getAllDrawBoards();
        };
    
        getAllInfo();
        const intervalId = setInterval(getAllInfo, 5000);
    
        return () => {
            clearInterval(intervalId);
        };
    }, [appData.appUser.name]);

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