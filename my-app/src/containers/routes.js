import { lazy } from "react"
import HomePage from "./HomePage"

const AllRoutes = [
    {
        path: "/",
        element: () => <HomePage />,
    },
]

export default AllRoutes