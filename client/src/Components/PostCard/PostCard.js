import React, { useContext } from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="border-2 border-workout-primary rounded-lg shadow-2xl m-6">
      <figure>
        <img
          className=" h-72 w-full rounded-t-lg"
          src={`${post.image}`}
          alt="gym"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <h2 className="card-title ">{post.muscleGroupId}</h2>
        <p>{post.description.slice(0, 200)}</p>
        {/* <p>{Time}</p>
        <p>{Date}</p> */}
        <div className="w-full mt-6">
          <Link to={`/postDetails/${post._id}`}>
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
