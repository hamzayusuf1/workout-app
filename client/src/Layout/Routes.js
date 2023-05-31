import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Main from "../Pages/Main/Main";
import PostDetails from "../Components/PostDetails/PostDetails";
import SignIn from "../Components/SignIn/SignIn";

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
    ],
  },
]);

export default router;
