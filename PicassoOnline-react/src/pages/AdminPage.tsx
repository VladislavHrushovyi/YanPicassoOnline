import { Col, Row } from "react-bootstrap"
import { AllUserList } from "../components/AllUserList"

export const AdminPage = () => {

    return (
        <>
            <Row>
                <Col md={4}>
                    <AllUserList />
                </Col>
                <Col md={6}>

                </Col>
            </Row>
        </>
    )
}