import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import Auth from "../../utils/AuthContext";
import { AuthContext } from "../../utils/AuthProvider";
import { saveWorkout } from "../../utils/API";

const PostCard = ({ post }) => {
  const { user } = useContext(AuthContext);

  const handleSaveWorkout = async (e) => {
    e.preventDefault();

    const userEmail = user?.user?.email;
    const username = user?.user?.username;
    console.log(userEmail);
    console.log(username);

    const { _id, title, description, muscleGroup, image, postDate } = post;

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
          <Link to={`/postDetails/${post._id}`}>
            <button className=" p-4 me-4 badge bg-workout-primary text-workout-secondary font-bold mb-2">
              View Details
            </button>
          </Link>
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

export default PostCard;
