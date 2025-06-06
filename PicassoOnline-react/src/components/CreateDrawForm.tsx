import { Button, Form } from "react-bootstrap"
import { useCreateDrawForm } from "../hooks/useCreateDrawForm";

export const CreateDrawForm = () => {

    const { drawerNameInput, submitHandle } = useCreateDrawForm();

    return (
        <>
            <Form onSubmit={submitHandle} className="border-2 px-2 py-4 border-yellow-950">
                <Form.Group className="">
                    <Form.Label
                        className="text-2xl mb-2"
                    >
                        ІМ'Я ХУДОЖНИКА
                    </Form.Label>
                    <Form.Control {...drawerNameInput} type="input" className="mb-2" />
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