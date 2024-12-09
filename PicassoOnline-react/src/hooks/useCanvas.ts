import { RefObject, useState } from "react"
import { useToolbox } from "./useToolbox"
import { PencilTypes } from "../types/enums";

export const useCanvas = () => {
  const toolbox = useToolbox();

  const [canvasRef, setCanvasRef] = useState<RefObject<HTMLCanvasElement>>()
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const setRef = (ref: RefObject<HTMLCanvasElement>) => {
    setCanvasRef(_ => ref)
  }

  
  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, lineWidth: number, hexColor: string) => {
    const context = canvasRef?.current?.getContext("2d")
    if (context) {
      //setPosition(e)
      const { offsetX, offsetY } = e.nativeEvent;
      context.beginPath();
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.strokeStyle = toolbox.pencilHandler.activePencil.PENCIL_TYPE === PencilTypes.ERAISER_PENCIL ? "#FFFFFF" : hexColor;
      context.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  }

  const start = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isDrawing) {
      const context = canvasRef?.current?.getContext("2d")
      if (context) {
        //setPosition(e)
        const { offsetX, offsetY } = e.nativeEvent;
        context.lineTo(offsetX, offsetY);
        context.stroke();
      }
    }
  }

  const stop = () => {
    setIsDrawing(false);
  }

  const clearField = () => {
    const context = canvasRef?.current?.getContext("2d")
    if(context){
        context.clearRect(0,0, context.canvas.width, context.canvas.height)
    }
  }

  return {
    toolbox,
    canvasRef,
    draw,
    start,
    stop,
    setRef,
    clearField
  }
}