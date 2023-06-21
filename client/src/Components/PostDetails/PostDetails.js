import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-hot-toast";

import { saveWorkout } from "../../utils/API";
import { useAppContext } from "../../State/AppContext";
import { AuthContext } from "../../utils/AuthProvider";
import Auth from "../../utils/AuthContext";

const PostDetails = () => {
  const { user } = useContext(AuthContext);

  const postDetails = useLoaderData();

  const { _id, title, description, muscleGroup, postDate, image } = postDetails;

  const handleSaveWorkout = async (e) => {
    e.preventDefault();

    const userEmail = user?.user?.email;
    const username = user?.user?.username;
    console.log(userEmail);
    console.log(username);

    const { _id, title, description, muscleGroup, image, postDate } =
      postDetails;

    const workoutObj = {
      userEmail,
      username,
      _id,
      title,
      description,
      image,
      muscleGroup,
      postDate,
    };

    const res = await saveWorkout(workoutObj);

    if (res.status !== 201) {
      const error = await res.json();
      toast.error(error.message);
      return;
    }

    const data = await res.json();
    toast.success("Workout Saved Successfully");
    return data;
  };
  return (
    <div
      className="w-full flex justify-center h-screen"
      style={{ color: "white" }}
    >
      <div className="card w-full">
        <figure>
          <img
            className="w-[800px] rounded-lg"
            src={`https://workout-server-1meu.onrender.com/${image}`}
            alt="Exercise"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h2 className="card-title">{muscleGroup}</h2>
          <p>{description}</p>
          <p>{`Posted By: ${postDetails.username}`}</p>

          <p>{`${postDate}`}</p>
          {Auth.loggedIn() && (
            <button
              className=" p-4 badge bg-workout-primary text-workout-secondary font-bold"
              onClick={handleSaveWorkout}
            >
              Save Workout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
