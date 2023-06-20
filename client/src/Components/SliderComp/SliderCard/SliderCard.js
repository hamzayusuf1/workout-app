import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { saveWorkout } from "../../../utils/API";
import Auth from "../../../utils/AuthContext";
import { AuthContext } from "../../../utils/AuthProvider";

const SliderCard = ({ sliderCardPost }) => {
  const { user } = useContext(AuthContext);

  console.log(sliderCardPost);

  const { _id, title, description, image, muscleGroup } = sliderCardPost;
  const handleSaveWorkout = async (e) => {
    e.preventDefault();

    const userEmail = user?.user?.email;
    const username = user?.user?.username;
    console.log(userEmail);
    console.log(username);

    const { _id, title, description, muscleGroup, image, postDate } =
      sliderCardPost;

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
      className="border-2 border-workout-primary me-4 rounded-lg shadow-2xl m-6 "
      style={{ color: "white" }}
    >
      <figure>
        <img
          className=" h-72 w-full "
          src={`http://localhost:5008/${image}`}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <h2 className="card-title">{muscleGroup}</h2>
        <p>{description.slice(0, 100)}</p>

        <div className="w-full mt-6">
          <Link to={`/postDetails/${_id}`}>
            <button className=" p-4 mb-2 me-4 badge bg-workout-primary text-workout-secondary font-bold">
              View Details
            </button>
          </Link>
          {Auth.loggedIn() && (
            <button
              onClick={handleSaveWorkout}
              className=" p-4 badge bg-workout-primary text-workout-secondary font-bold"
            >
              Save Workout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
