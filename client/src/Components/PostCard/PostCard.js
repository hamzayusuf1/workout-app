import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useAppContext } from "../../State/AppContext";

const PostCard = ({ post }) => {
  const { userData } = useAppContext();

  const { email, username } = userData;

  const handleSaveWorkout = (e) => {
    e.preventDefault();

    const { _id, title, description, muscleGroup } = post;

    fetch("http://localhost:5008/workout/saveWorkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        username,
        email,
        title,
        description,
        muscleGroup,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.error(`${data.message}`);
        } else {
          toast.success("Workout Saved Successfully");
        }
      });
  };

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
          <Link
            onClick={() => {
              console.log(post);
            }}
            to={`/postDetails/${post._id}`}
          >
            <button className=" p-4 me-4 badge bg-workout-primary text-workout-secondary font-bold">
              View Details
            </button>
          </Link>
          {userData && (
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

export default PostCard;
