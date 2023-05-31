import React, { useContext } from "react";
import { Link } from "react-router-dom";

const SliderCard = ({ sliderCardPost }) => {
  const { _id, title, description, image, muscleGroupId } = sliderCardPost;
  const handleSaveWorkout = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="border-2 border-workout-primary me-4 "
      style={{ color: "white" }}
    >
      <figure>
        <img className=" h-72 w-full " src={`${image}`} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <h2 className="card-title">{muscleGroupId}</h2>
        <p>{description.slice(0, 100)}</p>

        <div className="w-full mt-6">
          <Link to={`/postDetails/${_id}`}>
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

export default SliderCard;
