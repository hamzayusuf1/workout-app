import React from "react";
import Banner from "../../Components/Banner/Banner";
import MainSlider from "../../Components/SliderComp/Slider/Slider";

import Posts from "../../Components/Posts/Posts";

const Home = () => {
  return (
    <div className="text-red-600">
      <Banner></Banner>
      <Posts></Posts>
      {/* <MainSlider></MainSlider> */}
    </div>
  );
};

export default Home;
