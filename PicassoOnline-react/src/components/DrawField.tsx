import { LegacyRef } from "react"

interface DrawFieldProps {
    ref: LegacyRef<HTMLCanvasElement>,
}

export const DrawField = ({ ref }: DrawFieldProps) => {

    return (
        <>
            <canvas
                ref={ref}
                className="w-full h-full bg-slate-500 p-0 m-0"
            >

            </canvas>
        </>
    )
}