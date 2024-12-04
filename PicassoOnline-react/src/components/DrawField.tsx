import { RefObject, useEffect, useRef } from "react"

interface DrawFieldProps {
    setRef: ((ref: RefObject<HTMLCanvasElement>) => void),
    draw: ((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, lineWidth: number, hexColor: string) => void),
    start: ((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void),
    stop: ((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void),
    pencilPayload: {hexColor: string, lineWidth: number}
}

export const DrawField = ({ setRef, start, draw, stop, pencilPayload }: DrawFieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const initRef = () => {
            setRef(canvasRef)
        }

        initRef()
        const resize = () => {
            const canvas = canvasRef?.current;
            if (canvas) {
              canvas.width = window.innerWidth * 0.7;
              canvas.height = window.innerHeight * 0.6;
           }
          };
    
          resize();
    
          window.addEventListener("resize", resize);
    
          return () => {
            window.removeEventListener("resize", resize);
          };
    }, [])

    return (
        <>
            <canvas
                style={{width:"100%", height:"100%"}}
                ref={canvasRef}
                onMouseDown={(e) => draw(e, pencilPayload.lineWidth, pencilPayload.hexColor)}
                onMouseMove={(e) => start(e)}
                onMouseUp={(e) => stop(e)}
                className="w-full h-full bg-slate-500 p-0 m-0"
            >

            </canvas>
        </>
    )
}