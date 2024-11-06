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
                path: "draw",
                element: <DrawPage />
            },
            {
                path: "admin",
                element: <AdminPage />
            }
        ]
    },
])