import { RefObject, useEffect, useRef } from "react"
import { sendDrawBoardState } from "../connector/connector"

interface DrawFieldProps {
    connId: string,
    setRef: ((ref: RefObject<HTMLCanvasElement>) => void),
    draw: ((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, lineWidth: number, hexColor: string) => void),
    start: ((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void),
    stop: (() => void),
    pencilPayload: { hexColor: string, lineWidth: number },
    getColorByClick: ((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void)
}

export const DrawField = ({ connId, setRef, start, draw, stop, pencilPayload, getColorByClick }: DrawFieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const initRef = () => {
            setRef(canvasRef)
        }

        initRef()
        const resize = () => {
            const canvas = canvasRef?.current;
            if (canvas) {
                canvas.width = window.innerWidth * 0.9;
                canvas.height = window.innerHeight * 0.9;
                canvas.style.width = `${window.innerWidth * 0.9}px`;
                canvas.style.height = `${window.innerHeight * 0.9}px`;
            }
        };

        resize();

        window.addEventListener("resize", resize);
        
        let prevState : string = ""
        const updatingDrawField = setInterval(() => {
            const canvas = canvasRef?.current
            if (canvas) {
                const currentState = canvas.toDataURL() // TODO: improve this, optimizing the data sent
                if(prevState !== currentState) {
                    sendDrawBoardState(connId as string, currentState as string)
                    prevState = currentState

                }
            }
        }, 2000)

        return () => {
            window.removeEventListener("resize", resize);
            clearInterval(updatingDrawField)
        };
    }, [])

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