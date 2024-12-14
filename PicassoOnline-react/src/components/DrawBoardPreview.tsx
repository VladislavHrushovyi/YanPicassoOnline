import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { IMAGE_HOLDER } from "../utils/constants"

interface DrawBoardPreviewProps {
    base64: string,
    connId: string
}

export const DrawBoardPreview = ({ base64, connId }: DrawBoardPreviewProps) => {

    return (
        <>
            <Image
                src={base64 !== "" ? base64 : IMAGE_HOLDER}
                className="w-full h-56 px-0 shadow-2xl shadow-blue-400 rounded"
            />
            <Link
                to={`draw/${connId}`}
                className="mt-2"
            >
                Приєднатися {connId?.substring(0, 5)}
            </Link>
        </>
    )
}