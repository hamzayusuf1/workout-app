import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import Auth from "../../utils/AuthContext";

import { useAppContext } from "../../State/AppContext";

const PostCard = ({ post }) => {
  const { userData } = useAppContext();

  const { email, username } = userData;

  const handleSaveWorkout = async (e) => {
    e.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    const { _id, title, description, muscleGroup } = post;

    const response = await fetch("http://localhost:5008/workout/saveWorkout", {
      method: "POST",
      headers: {
        authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiaGFtemF5dXN1ZjI2IiwiZW1haWwiOiJoYW16YUB5dXN1Zi5jb20iLCJfaWQiOiI2NDg4NTgzOWQ2ZGI2NTAwMTllODZhM2IifSwiaWF0IjoxNjg2Njc5MTE4LCJleHAiOjE2ODY2ODYzMTh9.V9CpTnyWqODXI2YwbZE9Mi1kysAIMY5RPf2VpChaPnw"}`,
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
    });

    if (!response.ok) {
      return await response.json().then((res) => {
        console.log(res.message);
        toast.error(`${res.message}`);
      });
    }
    toast.success("Workout Saved Successfully");
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
          {userData.username && (
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
