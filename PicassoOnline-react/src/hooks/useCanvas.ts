import { RefObject, useEffect, useState } from "react"
import { useToolbox } from "./useToolbox"
import { PencilTypes } from "../types/enums";
import { rgbToHex } from "../utils/colorConverter";
import { useAppSelector } from "../store/hooks";

export const useCanvas = () => {
  const toolbox = useToolbox();
  const appData = useAppSelector(x => x.app)
  const [canvasRef, setCanvasRef] = useState<RefObject<HTMLCanvasElement>>()
  const [isDrawing, setIsDrawing] = useState<boolean>(false)


  const setRef = (ref: RefObject<HTMLCanvasElement>) => {
    setCanvasRef(_ => ref)
  }

  useEffect(() => {
    if(!canvasRef && !appData.boardData.base64Image) return;

    const canvas = canvasRef?.current
    const context = canvas?.getContext("2d")
    const image = new Image()
    image.src = appData.boardData.base64Image
    context?.drawImage(image, 0, 0)
  }, [canvasRef, appData.boardData.base64Image])


  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, lineWidth: number, hexColor: string) => {
    if (toolbox.pencilHandler.activePencil.PENCIL_TYPE !== PencilTypes.EYEDROPPER_PENCIL) {
      const context = canvasRef?.current?.getContext("2d")
      if (context) {
        const { offsetX, offsetY } = e.nativeEvent;
        context.beginPath();
        context.lineWidth = lineWidth;
        context.lineCap = "round";
        context.strokeStyle = toolbox.pencilHandler.activePencil.PENCIL_TYPE === PencilTypes.ERAISER_PENCIL ? "#FFFFFF" : hexColor;
        context.moveTo(offsetX, offsetY);
        setIsDrawing(true);
      }
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

  const getColorByClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (toolbox.pencilHandler.activePencil.PENCIL_TYPE === PencilTypes.EYEDROPPER_PENCIL) {
      const canvas = canvasRef?.current;
      console.log("CCLICK")
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const pixelInfo = ctx?.getImageData(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 1, 1)
        const hexColor = rgbToHex(pixelInfo?.data[0] as number, pixelInfo?.data[1] as number, pixelInfo?.data[2] as number);

        toolbox.colorPicker.onChange(hexColor);
      }
    }
  }

  const stop = () => {
    setIsDrawing(false);
  }

  const clearField = () => {
    const context = canvasRef?.current?.getContext("2d")
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    }
  }

  return {
    toolbox,
    getColorByClick,
    canvasRef,
    draw,
    start,
    stop,
    setRef,
    clearField
  }
}