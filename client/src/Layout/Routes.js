import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Main from "../Pages/Main/Main";
import PostDetails from "../Components/PostDetails/PostDetails";
import SignIn from "../Components/SignIn/SignIn";
import SignUp from "../Components/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardHome from "../Components/DashboardHome/DasboardHome/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/postDetails/:id",
        element: <PostDetails></PostDetails>,
      },

      {
        path: "/Login",
        element: <SignIn></SignIn>,
      },
      {
        path: "/Register",
        element: <SignUp></SignUp>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "/dashboard",
            element: <DashboardHome></DashboardHome>,
          },
        ],
      },
    ],
  },
]);

export default router;
