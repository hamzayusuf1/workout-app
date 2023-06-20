//This section will display all the posts that the logged in user has added to the site

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

import PostCard from "../../PostCard/PostCard";

const AllMyPosts = () => {
  const [errorMes, setErrorMes] = useState("");
  // const [posts, setPosts] = useState([]);

  const posts = useLoaderData().user?.posts;

  // useEffect(() => {
  //   fetch("http://localhost:5008/workout/myPosts/:id")
  //     .then((res) => {
  //       if (res.status !== 202) {
  //         return res.json().then((res) => {
  //           setErrorMes(res.message);
  //           toast.error(res.message);
  //         });
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       // setPosts(data?.posts);
  //     });
  // }, []);

  return (
    // <div>hello world</div>
    <>
      {errorMes ? (
        <div>
          {`Sorry we couldn't render your workouts, please try again later`}
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
        </div>
      )}
    </>
  );
};

export default AllMyPosts;
