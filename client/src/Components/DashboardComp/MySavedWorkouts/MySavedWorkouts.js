import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import PostCard from "../../PostCard/PostCard";

const MySavedWorkouts = () => {
  const [errorMes, setErrorMes] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const res = await fetch("http://localhost:5008/workout/mySaved");

    if (res.status !== 202) {
      const error = await res.json();
      setErrorMes(error.message);
      toast.error(error.message);
      return;
    }

    const data = await res.json();
    toast.success("Workout Saved Successfully");
    return data;
  }, []);

  const pages = 1;

  return (
    <>
      {errorMes ? (
        <div>
          {`Sorry we couldn't render your workouts, please try again later`}
          dashboard
        </div>
      ) : (
        <div className="col-span-3">
          <div
            className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5  me-6"
            style={{ color: "white" }}
          >
            {posts.map((post) => (
              <PostCard key={post._id} post={posts}></PostCard>
            ))}
          </div>
          <div className="pagination w-full text-center mt-8 text-workout-primary "></div>
        </div>
      )}
    </>
  );
};

export default MySavedWorkouts;
