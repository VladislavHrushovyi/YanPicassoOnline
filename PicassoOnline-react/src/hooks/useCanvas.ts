import { RefObject, useState } from "react"

export const useCanvas = () => {
    const [canvasRef, setCanvasRef] = useState<RefObject<HTMLCanvasElement>>()
    const [isDrawing, setIsDrawing] = useState<boolean>(false)
    const setRef = (ref: RefObject<HTMLCanvasElement>) => {
      setCanvasRef(_ => ref)
    }

    const getCoord = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef?.current
      if (canvas) {
        console.log(e.clientX, "left")
        console.log(e.clientY, "right")
        return {
          x: e.clientX,
          y: e.clientY
        };
      } else {
        return { x: 0, y: 0 };
      }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, lineWidth: number, hexColor: string) => {
      setIsDrawing(true);
      const context = canvasRef?.current?.getContext("2d")
      if (context) {
        const coord = getCoord(e)
        console.log("DRAWINg")
        context.beginPath();
        context.lineWidth = lineWidth;
        context.lineCap = "round";
        context.strokeStyle = hexColor;
        context.moveTo(coord.x, coord.y);
      }
    }

    const start = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (isDrawing) {
        const context = canvasRef?.current?.getContext("2d")
        if (context) {
          const coord = getCoord(e)
          context.lineTo(coord.x, coord.y);
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