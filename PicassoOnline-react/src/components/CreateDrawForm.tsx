import { Button, Form } from "react-bootstrap"

export const CreateDrawForm = () => {

    return (
        <>
            <Form className="border-2 border-yellow-950">
                <Form.Group className="">
                    <Form.Label
                        className="text-2xl"
                    >
                        ІМ'Я ХУДОЖНИКА
                    </Form.Label>
                    <Form.Control type="input" />
                </Form.Group>
                <Form.Group className="text-center">
                    <Button
                        type="submit"
                        className={"w-1/2"}
                    >
                        СТВОРИТИ
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
}