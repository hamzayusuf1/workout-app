import React, { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../State/AppContext";
import { AuthContext } from "../../utils/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const imgLink = user?.user?.image;

  // console.log(user?.user?.image);

  useEffect(() => {
    setTimeout(() => {
      if (!user.isAuth) {
        navigate("/user/login");
      } else {
        navigate("/dashboard");
      }
    }, 300);
  }, [user.isAuth, navigate]);

  return (
    <div className="flex " style={{ color: "white" }}>
      <div className="font-poppins antialiased">
        <div id="view" className=" flex justify-start flex-row w-full">
          <div
            id="sidebar"
            className="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
          >
            <div className="space-y-6 md:space-y-10 mt-10">
              <div id="profile" className="space-y-3">
                <Link to="/dashboard">
                  {" "}
                  <img
                    src={
                      user?.user?.image
                        ? `https://workout-server-1meu.onrender.com/${imgLink}`
                        : `images/user.png`
                    }
                    alt="Profile picture"
                    className="w-10 md:w-16 rounded-full mx-auto"
                  />
                </Link>
                <div>
                  <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                    {user?.user?.username}
                  </h2>

                  <p className="text-xs text-gray-500 text-center">
                    {user?.user?.email}
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    Weight: {user?.user?.weight}
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    Height: {user?.user?.height}
                  </p>
                </div>
                <div className="divider"></div>
              </div>

              <div id="menu" className="flex flex-col space-y-2">
                <Link
                  to="/dashboard/editProfile"
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                >
                  <span className="">Edit Profile</span>
                </Link>
                <Link
                  to="/dashboard/addPost"
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                >
                  <span className="">Add Post</span>
                </Link>
                <Link
                  to="/dashboard/addCategory"
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                >
                  <span className="">Add New Category</span>
                </Link>
                <Link
                  to={`/dashboard/allMyPosts/${user?.user?._id}`}
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                >
                  <span className="">All My Posts</span>
                </Link>

                <Link
                  to="/dashboard/mySavedWorkouts"
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                >
                  <span className="">My Saved Workouts</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex items-center justify-center">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
