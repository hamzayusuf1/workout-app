import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Main from "../Pages/Main/Main";
import PostDetails from "../Components/PostDetails/PostDetails";
import SignIn from "../Components/SignIn/SignIn";
import SignUp from "../Components/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardHome from "../Components/DashboardComp/DashboardHome/DashboardHome";
import AddPost from "../Components/DashboardComp/AddPost/AddPost";

import AllMyPosts from "../Components/DashboardComp/AllMyPosts/AllMyPosts";
import MySavedWorkouts from "../Components/DashboardComp/MySavedWorkouts/MySavedWorkouts";
import AddCategory from "../Components/DashboardComp/AddCategory/AddCategory";
import EditProfile from "../Components/DashboardComp/EditProfile/EditProfile";

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
        loader: ({ params }) =>
          fetch(
            `https://workout-server-1meu.onrender.com/workout/getPosts/${params?.id}`
          ),
      },

      {
        path: "/user/login",
        element: <SignIn></SignIn>,
      },
      {
        path: "/user/register",
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
          {
            path: "/dashboard/addPost",
            element: <AddPost></AddPost>,
          },
          {
            path: "/dashboard/editProfile",
            element: <EditProfile></EditProfile>,
          },
          {
            path: "/dashboard/allMyPosts/:id",
            element: <AllMyPosts></AllMyPosts>,
            loader: ({ params }) =>
              fetch(
                `https://workout-server-1meu.onrender.com/workout/myPosts/${params?.id}`
              ),
          },
          {
            path: "/dashboard/mySavedWorkouts",
            element: <MySavedWorkouts></MySavedWorkouts>,
          },
          {
            path: "/dashboard/addCategory",
            element: <AddCategory></AddCategory>,
          },
        ],
      },
    ],
  },
]);

export default router;
