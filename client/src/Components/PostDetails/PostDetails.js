import React, { useContext } from "react";
import { AuthContext } from "../../../../auth/AuthContext/AuthProvider";
import { toast } from "react-hot-toast";

const DUMMY_DATA = [
  {
    _id: 1,
    image:
      "https://t4.ftcdn.net/jpg/03/50/81/89/240_F_350818949_lJTfzSTDr79e9Kn55PUVZjN19ct20uGc.jpg",
    title: "Bench Press",
    muscleGroupId: "chest",
    description: "Use barbell to progresivley increase weight on chest",
  },
];

const PostDetails = () => {
  const handleSaveWorkout = (e) => {
    e.preventDefault();
    const { _id, title, description, image, muscleGroupId } = DUMMY_DATA[0];
  };
  return (
    <div className="w-full flex justify-center " style={{ color: "white" }}>
      <div className="card w-full h-full">
        <figure>
          <img className=" object-fill " src={`image`} alt="car!" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h2 className="card-title">{muscleGroupId}</h2>
          <p>{description}</p>
          <p>Posted By: {userName}</p>

          <p>Post Date: {postDate}</p>
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
