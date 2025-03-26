import { RefObject } from "react";
import { ActionTypes, RootAction } from "../types/BroadcastActionTypes";

interface PencilData {
    offsetX: number;
    offsetY: number;
    lineWidth: number;
    color: string;
}

interface EraserData {
    offsetX: number;
    offsetY: number;
    lineWidth: number;
    color: string;
}


export const applyRootAction = (rootAction: RootAction, ref: RefObject<HTMLCanvasElement>) => {
    switch (rootAction.type) {
        case ActionTypes.PENCIL:
            drawPencil(rootAction.data, ref)
        break
        case ActionTypes.ERASER:
            eraiserPencil(rootAction.data, ref)
            break
        default:
        break
    }
}

const eraiserPencil = (data: string, ref: RefObject<HTMLCanvasElement>) => {
    console.log("🎨 Applying Eraiser Action", ref); 
    const eraiserData = JSON.parse(data) as EraserData;
    const context = ref.current?.getContext("2d");
    if (context) {
        console.log("🎨 Drawing Eraiser");
        const { offsetX, offsetY, lineWidth, color } = eraiserData;
        context.beginPath();
        context.lineWidth = lineWidth;
        context.lineCap = "round";
        context.strokeStyle = color;
        context.moveTo(offsetX, offsetY)
        context.lineTo(offsetX, offsetY)
        context.stroke();
    }
}

const drawPencil = (data: string, ref: RefObject<HTMLCanvasElement>) => {
    console.log("🎨 Applying Pencil Action", ref); 
            const pencilDataction = JSON.parse(data) as PencilData;
            const context = ref.current?.getContext("2d");
            if (context) {
                console.log("🎨 Drawing Pencil");
                const { offsetX, offsetY, lineWidth, color } = pencilDataction;
                context.beginPath();
                context.lineWidth = lineWidth;
                context.lineCap = "round";
                context.strokeStyle = color;
                context.moveTo(offsetX, offsetY)
                context.lineTo(offsetX, offsetY)
                context.stroke();
            }
}
