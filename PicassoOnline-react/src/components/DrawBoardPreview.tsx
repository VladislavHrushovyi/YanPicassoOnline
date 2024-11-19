import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAppSelector } from "../store/hooks"

export const DrawBoardPreview = () => {
    const activeDrawboard = useAppSelector(state => state)
    console.log(activeDrawboard, "allo")
    return (
        <>
            <Image
                src={"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22858%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20858%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_19301ef0939%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A43pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_19301ef0939%22%3E%3Crect%20width%3D%22858%22%20height%3D%22250%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22319.0124969482422%22%20y%3D%22144.2%22%3E858x250%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"}
                className="w-full h-56 px-0 shadow-2xl shadow-blue-400 rounded"
            />
            <Link
                to="draw/Mikola"
                className="mt-2"
            >
                Приєднатися
            </Link>
        </>
    )
}