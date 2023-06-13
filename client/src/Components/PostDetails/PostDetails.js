import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";

import { useAppContext } from "../../State/AppContext";

// const DUMMY_DATA = [
//   {
//     _id: 1,
//     image:
//       "https://t4.ftcdn.net/jpg/03/50/81/89/240_F_350818949_lJTfzSTDr79e9Kn55PUVZjN19ct20uGc.jpg",
//     title: "Bench Press",
//     muscleGroupId: "chest",
//     description: "Use barbell to progresivley increase weight on chest",
//   },
// ];
// const { _id, username, title, description, image, muscleGroup } = DUMMY_DATA[0];
const PostDetails = () => {
  const { userData } = useAppContext();
  const postDetails = useLoaderData();
  const { _id, username, title, description, muscleGroup, postDate } =
    postDetails;

  const handleSaveWorkout = (e) => {
    e.preventDefault();
    // const {
    //   _id,
    //   userName,
    //   title,
    //   description,
    //   muscleGroupId,
    //   image,
    //   postDate,
    // } = postDetails;
  };
  return (
    <div className="w-full flex justify-center " style={{ color: "white" }}>
      <div className="card w-full h-full">
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
