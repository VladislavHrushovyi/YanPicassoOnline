import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { IMAGE_HOLDER } from "../utils/constants"
import { useEffect, useState } from "react"
import { appApiHandlers } from "../axios/axiosClient"

interface DrawBoardPreviewProps {
    detailedInfoId: string,
    connId: string
}

export const DrawBoardPreview = ({ detailedInfoId, connId }: DrawBoardPreviewProps) => {
    const {getDrawBoardState} = appApiHandlers();
    const [base64, setBase64] = useState<string>("")
    useEffect(() => {
        const interval = setInterval(() => {
            if(detailedInfoId){
                getDrawBoardState(detailedInfoId).then(res => {
                    console.log(res)
                    setBase64(res.data.base64Image)
                })
            }
        }, 2000)

        return () => {
            clearInterval(interval)
        }
    }, [])
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