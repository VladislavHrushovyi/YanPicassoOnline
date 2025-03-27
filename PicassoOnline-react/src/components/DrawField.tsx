import { RefObject, useEffect, useRef } from "react"
import { appApiHandlers } from "../axios/axiosClient";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { InitialBoardData } from "../connector/types/responseTypes";
import { setBoardData } from "../store/appSlicer";

interface DrawFieldProps {
    connId: string,
    setRef: ((ref: RefObject<HTMLCanvasElement>) => void),
    draw: ((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, lineWidth: number, hexColor: string) => void),
    start: ((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void),
    stop: (() => void),
    pencilPayload: { hexColor: string, lineWidth: number },
    getColorByClick: ((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void)
}

export const DrawField = ({ setRef, start, draw, stop, pencilPayload, getColorByClick }: DrawFieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { sendDrawBoardState } = appApiHandlers();
    const appData = useAppSelector(x => x.app)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const initRef = () => {
            setRef(canvasRef)
        }

        initRef()
        const resize = () => {
            const canvas = canvasRef?.current;
            if (canvas) {
                // set the beackground if data from owner is updated
                canvas.width = window.innerWidth * 0.9;
                canvas.height = window.innerHeight * 0.9;
                canvas.style.width = `${window.innerWidth * 0.9}px`;
                canvas.style.height = `${window.innerHeight * 0.9}px`;
            }
        };

        resize();

        window.addEventListener("resize", resize);

        // add checking if appuser is equal to ownername
        let updatingDrawField: number = 1;
        if (appData.appUser.name === appData.boardData.owner){
        
        console.log(`updating draw field ${appData.appUser.name} -- ${appData.boardData.owner}`)
        let prevState: string = ""

        updatingDrawField = setInterval(() => {
            const canvas = canvasRef?.current

            if (canvas) {
                const currentState = canvas.toDataURL() // TODO: improve this, optimizing the data sent ?? i forgot what i meant by this
                if (prevState !== currentState) {
                    console.log(appData.boardData.detailedDataId)
                    sendDrawBoardState(appData.boardData.detailedDataId as string, currentState as string).then(() => {
                        const boardData = {...appData.boardData, base64Image: currentState} as InitialBoardData
                        dispatch(setBoardData(boardData))
                    })
                    prevState = currentState

                }
            }
        }, 2000)
    }

        return () => {
            window.removeEventListener("resize", resize);
            clearInterval(updatingDrawField)
        };
    }, [appData.boardData.owner])

    return (
        <>
            <canvas
                style={{ width: "100%", height: "100%" }}
                ref={canvasRef}
                onMouseDown={(e) => draw(e, pencilPayload.lineWidth, pencilPayload.hexColor)}
                onMouseMove={(e) => start(e)}
                onMouseUp={() => stop()}
                onClick={(e) => getColorByClick(e)}
                className="w-full h-full p-0 m-0"
            >

            </canvas>
        </>
    )
}