import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import PostCard from "../../PostCard/PostCard";

const MySavedWorkouts = ({ post }) => {
  const [errorMes, setErrorMes] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5008/workout/mySaved")
      .then((res) => {
        if (res.status !== 202) {
          return res.json().then((res) => {
            setErrorMes(res.message);
            toast.error(res.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.saved);
        setPosts(data?.saved);
      });

    // if (res.status !== 202) {
    //   const error = await res.json();
    //   setErrorMes(error.message);
    //   toast.error(error.message);
    //   return () => {};
    // }
    // const data = await res.json();
    // toast.success("Workout Saved Successfully");
    // return data;
  }, []);

  return (
    // <div>hello world</div>
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
              <PostCard key={post._id} post={post}></PostCard>
            ))}
          </div>
          <div className="pagination w-full text-center mt-8 text-workout-primary "></div>
        </div>
      )}
    </>
  );
};

export default MySavedWorkouts;
