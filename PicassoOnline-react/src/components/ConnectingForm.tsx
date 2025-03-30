import { Button, Form, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useConnectingForm } from "../hooks/useConnectingForm"

export const ConnectingForm = () => {
    const { codeInput } = useConnectingForm();

    return (
        <>
            <Row>
                <h2>Підключитися</h2>
            </Row>
            <Row>
                <Form onSubmit={() => { }} className="border-2 px-2 py-4 border-yellow-950">
                    <Form.Group className="">
                        <Form.Control {...codeInput} type="input" className="mb-2" placeholder="Ідентифікатор малювалки" />
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Link
                            to={`draw/${codeInput.value}`}
                            className="mt-2"
                        >
                            <Button
                                type="submit"
                                className={"w-1/2"}
                            >
                                Приєднатися {codeInput.value}
                            </Button>
                        </Link>
                    </Form.Group>
                </Form>
            </Row>
        </>
    )
}