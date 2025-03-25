import { RefObject } from "react";
import { ActionTypes, RootAction } from "../types/BroadcastActionTypes";

interface PencilData {
    offsetX: number;
    offsetY: number;
    lineWidth: number;
    color: string;
}


export const applyRootAction = (rootAction: RootAction, ref: RefObject<HTMLCanvasElement>) => {
    switch (rootAction.type) {
        case ActionTypes.PENCIL:
            console.log("🎨 Applying Pencil Action", ref); 
            const pencilDataction = JSON.parse(rootAction.data) as PencilData;
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
        break

        default:
        break
    }
}
