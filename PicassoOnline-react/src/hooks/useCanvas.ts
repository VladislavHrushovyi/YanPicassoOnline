import { RefObject, useState } from "react"

export const useCanvas = () => {
  const [canvasRef, setCanvasRef] = useState<RefObject<HTMLCanvasElement>>()
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const setRef = (ref: RefObject<HTMLCanvasElement>) => {
    setCanvasRef(_ => ref)
  }

  const setPosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) {
      return;
    }
    const canvasRect = canvasRef?.current?.getBoundingClientRect();
    if (canvasRect) {
      setPos(_ => {
        return {
          x: e.clientX - canvasRect.left,
          y: e.clientY - canvasRect.top
        }
      });
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, lineWidth: number, hexColor: string) => {
    setIsDrawing(true);
    const context = canvasRef?.current?.getContext("2d")
    if (context) {
      setPosition(e)
      context.beginPath();
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.strokeStyle = hexColor;
      context.moveTo(pos.x, pos.y);
    }
  }

  const start = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isDrawing) {
      const context = canvasRef?.current?.getContext("2d")
      if (context) {
        setPosition(e)
        context.lineTo(pos.x, pos.y);
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