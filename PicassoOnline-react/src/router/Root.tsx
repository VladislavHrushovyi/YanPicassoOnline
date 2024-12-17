// import { Stack } from "react-bootstrap"
import { Outlet } from "react-router-dom"

export const Root = () => {
    return (
        <>
            {/* <Stack direction="horizontal" gap={4}>
            <Link to={`main`}>Main</Link>
            <Link to={`draw`}>Draw</Link>
            <Link to={`admin`}>Admin</Link>
        </Stack> */}
            <div id="detail">
                <Outlet />
            </div>
        </>
    )
}