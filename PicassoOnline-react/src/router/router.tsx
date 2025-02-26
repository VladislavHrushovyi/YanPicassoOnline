import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { AdminPage } from "../pages/AdminPage";
import { DrawPage } from "../pages/DrawPage";
import { Root } from "./Root";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <MainPage />
            },
            {
                path: "main",
                element: <MainPage />
            },
            {
                path: "draw/:drawBoardname",
                element: <DrawPage />
            },
            {
                path: "admin",
                element: <AdminPage /> // fix this route for correct redirecting to user drawboard
            },
            {
                path: "admin/draw/:drawBoardname",
                element: <DrawPage />
            }
        ]
    },
])