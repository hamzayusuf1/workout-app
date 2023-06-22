import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import Auth from "../../utils/AuthContext";
import { AuthContext } from "../../utils/AuthProvider";
import { saveWorkout } from "../../utils/API";

const PostCard = ({ post, deleteBtn }) => {
  const { user } = useContext(AuthContext);

  const { _id, title, description, muscleGroup, image, postDate } = post;

  const userEmail = user?.user?.email;
  const username = user?.user?.username;

  const handleSaveWorkout = async (e) => {
    e.preventDefault();

    console.log(userEmail);
    console.log(username);

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

  const handleDeleteWorkout = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5008/workout/deletePost", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: _id, email: userEmail }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="border-2 border-workout-primary rounded-lg shadow-2xl m-6">
      <figure>
        <img
          className=" h-72 w-full rounded-t-lg"
          src={`https://workout-server-1meu.onrender.com/${post.image}`}
          alt="gym"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <h2 className="card-title ">{post.muscleGroup}</h2>
        <p>{post.description.slice(0, 200)}</p>
        {/* <p>{Time}</p>
        <p>{Date}</p> */}
        <div className="w-full mt-6">
          <div className="">
            <Link to={`/postDetails/${post._id}`}>
              <button className=" p-4 me-4 badge bg-workout-primary text-workout-secondary font-bold mb-2">
                View Details
              </button>
            </Link>
            {Auth.loggedIn() && (
              <button
                className=" p-4 me-4 mb-2 badge bg-workout-primary text-workout-secondary font-bold"
                onClick={handleSaveWorkout}
              >
                Save Workout
              </button>
            )}
            {deleteBtn && (
              <button
                className=" p-4 badge bg-error  font-bold border-black"
                onClick={handleDeleteWorkout}
              >
                Delete Workout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
