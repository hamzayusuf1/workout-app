import React, { useContext } from "react";
import { Link } from "react-router-dom";

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

const PostCard = ({ post }) => {
  return (
    <div className="border-2 border-workout-primary ">
      <figure>
        <img
          className=" h-72 w-full"
          src={`http://localhost:5000/${DUMMY_DATA[0].image}`}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{DUMMY_DATA[0].title}</h2>
        <h2 className="card-title ">{DUMMY_DATA[0].muscleGroupId}</h2>
        <p>{DUMMY_DATA[0].description.slice(0, 200)}</p>
        {/* <p>{Time}</p>
        <p>{Date}</p> */}
        <div className="w-full mt-6">
          <Link to={`/postDetails/${DUMMY_DATA[0]._id}`}>
            <button className=" p-4 me-4 badge bg-workout-primary text-workout-secondary font-bold">
              View Details
            </button>
          </Link>
          <button className=" p-4 badge bg-workout-primary text-workout-secondary font-bold">
            Save Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
