import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { IMAGE_HOLDER } from "../utils/constants"
import { useEffect } from "react"
import { appApiHandlers } from "../axios/axiosClient"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { attachBase64ImageToUser } from "../store/appSlicer"

interface DrawBoardPreviewProps {
    detailedInfoId: string,
    connId: string
}

export const DrawBoardPreview = ({ detailedInfoId, connId }: DrawBoardPreviewProps) => {
    const {getDrawBoardState} = appApiHandlers();
    const base64ImageByConnId = useAppSelector(x => x.appReducer.activeUsers?.find(x => x.connId === connId)?.base64Image)
    const disapatch = useAppDispatch();
    console.log(base64ImageByConnId?.substring(0, 5))
    useEffect(() => {
        const interval = setInterval(() => {
            if(detailedInfoId){
                getDrawBoardState(detailedInfoId).then(res => {
                    disapatch(attachBase64ImageToUser({connId, base64Image: res.data.base64Image}))
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
                src={base64ImageByConnId !== "" ? base64ImageByConnId : IMAGE_HOLDER}
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