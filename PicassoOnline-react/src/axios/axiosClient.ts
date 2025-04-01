import axios from "axios";
import { Base64ImageInfo } from "./responseTypes";

const appAxios = axios.create({
    baseURL: " http://localhost:5125/",
    headers: {
        "Content-Type": "application/json",
    },
})

export const appApiHandlers = () => {
    const sendDrawBoardState = async (dataId: string, base64Image: string) => {
        const data = {DetailInfoId: dataId, Base64: base64Image}
        console.log(data)
        const response = await appAxios.post("info-detail/update-base64Image", data)
        return response.status === 200;
    }

    const getDrawBoardState = async (dataId: string) => {
        const response = await appAxios.get<Base64ImageInfo>(`info-detail/get-base64/${dataId}`)
        return response
    }

    return {
        sendDrawBoardState,
        getDrawBoardState
    }
}