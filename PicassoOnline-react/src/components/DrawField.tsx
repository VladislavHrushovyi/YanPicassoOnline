import { RefObject, useEffect, useRef } from "react"
import { appApiHandlers } from "../axios/axiosClient";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setBase64Image } from "../store/appSlicer";

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
                console.log("resizing canvas")
                const ctx = canvas?.getContext("2d");
                const dpr = window.devicePixelRatio || 1;
                const rect = canvas.getBoundingClientRect();
                ctx!.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                ctx?.scale(dpr, dpr);
            }   
        };

        resize();

        window.addEventListener("resize", resize);

        let updatingDrawField: NodeJS.Timeout;
        if (appData.appUser.connId === appData.boardData.connId){
        
        console.log(`updating draw field ${appData.appUser.name} -- ${appData.boardData.owner}`)
        let prevState: string = ""

        updatingDrawField = setInterval(() => {
            const canvas = canvasRef?.current

            if (canvas) {
                const currentState = canvas.toDataURL() 
                if (prevState !== currentState) {
                    console.log(appData.boardData.detailedDataId)
                    sendDrawBoardState(appData.boardData.detailedDataId as string, currentState as string).then(() => {
                        dispatch(setBase64Image(currentState))
                    })
                    prevState = currentState

                }
            }
        }, 2000)
    }

        return () => {
            window.removeEventListener("resize", resize);
            clearInterval(updatingDrawField)
            dispatch(setBase64Image(""));
        };
    }, [appData.boardData.connId])

    return (
        <>
            <canvas
                style={{ width: "100%", height: "100%" }}
                ref={canvasRef}
                onMouseDown={(e) => draw(e, pencilPayload.lineWidth, pencilPayload.hexColor)}
                onMouseMove={(e) => start(e)}
                onMouseUp={() => stop()}
                onClick={(e) => getColorByClick(e)}
                className="p-0 m-0 w-full h-full"
            >

            </canvas>
        </>
    )
}