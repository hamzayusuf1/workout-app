import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderCard from "../SliderCard/SliderCard";
import { CiDumbbell } from "react-icons/ci";
import "./Slider.css";

const MainSlider = () => {
  const [sliderCardPosts, setSliderCardPosts] = useState([
    {
      _id: 1,
      image:
        "https://t4.ftcdn.net/jpg/03/50/81/89/240_F_350818949_lJTfzSTDr79e9Kn55PUVZjN19ct20uGc.jpg",
      title: "Bench Press",
      muscleGroupId: "chest",
      description: "Use barbell to progresivley increase weight on chest",
    },
    {
      _id: 2,
      image:
        "https://t4.ftcdn.net/jpg/03/50/81/89/240_F_350818949_lJTfzSTDr79e9Kn55PUVZjN19ct20uGc.jpg",
      title: "Pull ups",
      muscleGroupId: "Back",
      description: "Use you body weight to strengthen your muscles",
    },
  ]);

  return (
    <div className="my-16">
      <div className=" text-center text-4xl font-bold text-workout-primary">
        Most Recent
      </div>
      <div className="divider w-64  mx-auto">
        <CiDumbbell className="text-8xl text-workout-primary"></CiDumbbell>
      </div>
      <Slider>
        {sliderCardPosts.map((sliderCardPost) => (
          <SliderCard
            key={sliderCardPost._id}
            sliderCardPost={sliderCardPost}
          ></SliderCard>
        ))}
      </Slider>
    </div>
  );
};

export default MainSlider;
