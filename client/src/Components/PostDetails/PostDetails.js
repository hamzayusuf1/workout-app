import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";

import { useAppContext } from "../../State/AppContext";

const PostDetails = () => {
  const { userData } = useAppContext();
  const postDetails = useLoaderData();
  const { _id, username, title, description, muscleGroup, postDate } =
    postDetails;

  const handleSaveWorkout = (e) => {
    e.preventDefault();
    const {
      _id,
      userName,
      title,
      description,
      muscleGroupId,
      image,
      postDate,
    } = postDetails;
  };
  return (
    <div
      className="w-full flex justify-center h-screen"
      style={{ color: "white" }}
    >
      <div className="card w-full h-1/2">
        <figure>
          <img className=" object-fill " src={``} alt="Exercise" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h2 className="card-title">{muscleGroup}</h2>
          <p>{description}</p>
          <p>{`Posted By: ${username}`}</p>

          <p>{`${postDate}`}</p>
          <button
            className=" p-4 badge bg-workout-primary text-workout-secondary font-bold"
            onClick={handleSaveWorkout}
          >
            Save Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
