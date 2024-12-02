import { RefObject, useState } from "react"

export const useCanvas = () => {
    const [canvasRef, setCanvasRef] = useState<RefObject<HTMLCanvasElement>>()
    const [isDrawing, setIsDrawing] = useState<boolean>(false)
    const setRef = (ref: RefObject<HTMLCanvasElement>) => {
      setCanvasRef(_ => ref)
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, lineWidth: number, hexColor: string) => {
      setIsDrawing(true);
      const context = canvasRef?.current?.getContext("2d")
      if (context) {
        console.log("DRAWINg")
        context.beginPath();
        context.lineWidth = lineWidth;
        context.lineCap = "round";
        context.strokeStyle = hexColor;
        context.moveTo(e.nativeEvent.clientX, e.nativeEvent.clientY);
      }
    }

    const start = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (isDrawing) {
        const context = canvasRef?.current?.getContext("2d")
        if (context) {
          context.lineTo(e.clientX, e.clientY);
          context.stroke();
        }
    }
  }

    const stop = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        setIsDrawing(false);
    }

    return {
        canvasRef,
        draw,
        start,
        stop,
        setRef
    }
}