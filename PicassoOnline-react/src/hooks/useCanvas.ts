import { useEffect, useRef } from "react"

export const useCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    console.log(canvasRef.current, "canvas ref")
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d")

    let coord = {x: 0, y: 0};

    const resize = () => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      };
    
      const reposition = (event: MouseEvent) => {
        if (canvas) {
          coord.x = event.clientX - canvas.offsetLeft;
          coord.y = event.clientY - canvas.offsetTop;
        }
      };
    
      const draw = (event: MouseEvent) => {
        if (context) {
          context.beginPath();
          context.lineWidth = 5;
          context.lineCap = "round";
          context.strokeStyle = "#ACD3ED";
          context.moveTo(coord.x, coord.y);
          reposition(event);
          context.lineTo(coord.x, coord.y);
          context.stroke();
        }
      };
    
      const start = (event: MouseEvent) => {
        document.addEventListener("mousemove", draw);
        reposition(event);
      };
    
      const stop = () => {
        document.removeEventListener("mousemove", draw);
      };
    
      useEffect(() => {
          resize();
    
          window.addEventListener("resize", resize);
    
          document.addEventListener("mousedown", start);
          document.addEventListener("mouseup", stop);
    
          return () => {
            window.removeEventListener("resize", resize);
    
            document.removeEventListener("mousedown", start);
            document.removeEventListener("mouseup", stop);
          };
        }, []);

    return {
        canvasRef
    }
}