import React, { useEffect, useState } from "react";
import { CiDumbbell } from "react-icons/ci";
import AuthContext from "../../utils/AuthContext";

import PostCard from "../PostCard/PostCard";
import { getAllPosts } from "../../utils/API";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [regex, setRegex] = useState("");
  const pages = Math.ceil(count / size);
  const [category, setCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState([]);

  console.log(category);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       const token = AuthContext.loggedIn() ? AuthContext.getToken() : 0;

  //       console.log(token);

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await errorFetcher({
  //         url: "http://localhost:5008/workout/getAllPosts",
  //         options: {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             // authorization: `Bearer ${token}`,
  //           },
  //         },
  //       })
  //         .then((res) => console.log(res))
  //         .catch((err) => console.log(err));

  //       // const response = await fetch(
  //       //   "http://localhost:5008/workout/getAllPosts",
  //       //   {
  //       //     method: "GET",
  //       //     headers: {
  //       //       "Content-Type": "application/json",
  //       //       authorization: `Bearer ${token}`,
  //       //     },
  //       //   }
  //       // );

  //       console.log(response);

  //       if (!response.ok) {
  //         throw new Error("Something went wrong");
  //       }

  //       const { result } = await response.json();

  //       setPosts(result);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getPosts();
  // }, []);

  // useEffect(async () => {
  //   const response = await fetch("http://localhost:5008/workout/getAllPosts", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error("something went wrong!");
  //   }

  //   const data = await response.json();
  //   setPosts(data);
  //   return () => {};
  // });

  useEffect(() => {
    fetch("http://localhost:5008/workout/getAllCategories")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const arr = res.result.map((obj) => obj.category);

        setSearchCategory(arr);
        console.log(arr);
        console.log(searchCategory);
      });

    const getPosts = async () => {
      const url = `http://localhost:5008/workout/getAllPosts?category=${category}&page=${page}&size=${size}&regex=${regex}`;
      // const token = AuthContext.loggedIn() ? AuthContext.getToken() : 0;
      // console.log(token);
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPosts(data?.posts);
          setCount(data?.count);
        });
    };
    getPosts();
  }, [category, page, regex, size]);

  return (
    <div className=" mt-10">
      <div className=" text-center text-4xl font-bold text-workout-primary">
        Find Workouts
      </div>
      <div className="divider w-64  mx-auto">
        <CiDumbbell className="text-8xl text-workout-primary"></CiDumbbell>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 mt-10">
        <div className=" mx-auto text-workout-primary ">
          <div>
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  onChange={(e) => {
                    setRegex(e.target.value);
                  }}
                  placeholder="Search for workouts"
                  className="input input-bordered text-xl"
                />
                <button className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <p className="my-6 font-bold text-workout-primary text-2xl">
            {" "}
            Search By Fitness Category
          </p>
          <div className="form-control">
            <div className="input-group">
              <select
                className="select select-bordered text-xl"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                defaultValue={""}
              >
                <option value="" selected>
                  Select
                </option>
                {searchCategory.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
              <button className="btn">Go</button>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div
            className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5  me-6"
            style={{ color: "white" }}
          >
            {posts?.map((post) => (
              <PostCard key={post._id} post={post}></PostCard>
            ))}
          </div>
          <div className="pagination w-full text-center mt-8 text-workout-primary ">
            <p className="mb-6">Selected Page {page + 1}</p>
            {[...Array(pages).keys()].map((number) => (
              <button
                key={number}
                onClick={() => setPage(number)}
                className="me-4"
              >
                {number + 1}
              </button>
            ))}
            <select onChange={(event) => setSize(event.target.value)}>
              <option value="6" defaultValue={6}>
                6
              </option>
              <option value="12">12</option>
              <option value="18">18</option>
              <option value="24">24</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
