import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { actionsTypes } from "../../../State/Actions/Actions";
import { useAppContext } from "../../../State/AppContext";
import { addPost } from "../../../utils/API";
import { AuthContext } from "../../../utils/AuthProvider";

const AddPost = () => {
  const { user } = useContext(AuthContext);

  const { state, dispatch } = useAppContext();

  const handleImageChange = (e) => {
    dispatch({
      type: actionsTypes.UPLOAD_POST_IMAGE,
      payload: e.target.files[0],
    });
  };

  useEffect(() => {
    fetch("https://workout-server-1meu.onrender.com/workout/getAllCategories")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const arr = res.result.map((obj) => obj.category);

        dispatch({
          type: actionsTypes.CHANGE_CATEGORY,
          payload: arr,
        });
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpload = async (data, event) => {
    event.preventDefault();

    console.log(state.addPostImage);

    if (!state?.addPostImage) {
      window.alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("username", user?.user?.username);
    formData.append("email", user?.user?.email);
    formData.append("firstName", data.firstName);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("muscleGroup", data.muscleGroup);
    formData.append("image", state?.addPostImage);

    try {
      console.log(Object.fromEntries(formData));

      var object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      // var json = JSON.stringify(object);
      // console.log(json);

      const response = await addPost(formData);
      console.log(response);
      if (!response.ok) {
        return await response.json().then((res) => {
          // setErrorMessage(res.message);
          console.log(res.message);
        });
      }
      const newWorkout = await response.json();

      console.log(newWorkout);
      return toast.success("Add post successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-16 w-full">
      <h1
        className="text-4xl font-bold text-center my-10 mt-10 md:mt-10 lg:mt-10  "
        style={{ color: "white" }}
      >
        Add Post
      </h1>

      <form onSubmit={handleSubmit(handleUpload)} className="w-full">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              User Name
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="text"
            name="userName"
            {...register("username", {
              required: "A username is required",
            })}
            placeholder="Enter Your username"
            className="input input-bordered w-full "
          />
          <span className="text-sm text-error">
            {errors?.username?.message}
          </span>
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              Workout Title
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="text"
            {...register("title", {
              required: "A title is required",
            })}
            name="title"
            placeholder="Post Title"
            className="input input-bordered w-full "
          />

          <span className="text-sm text-error">{errors?.title?.message}</span>
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              Workout Description
            </span>
          </label>
          <textarea
            style={{ color: "black" }}
            name="description"
            {...register("description", {
              required: "A description is required",
            })}
            cols="30"
            rows="10"
            placeholder="Post Description"
            className="input input-bordered w-full "
          ></textarea>
          <span className="text-sm text-error">
            {errors?.description?.message}
          </span>
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              Workout Image
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="file"
            onChange={handleImageChange}
            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
            placeholder="Enter Image"
            className="input input-bordered w-full py-2 "
          />
        </div>
        <div className="block">
          <span className="font-bold text-lg" style={{ color: "white" }}>
            Workout Category :{" "}
          </span>{" "}
          <select
            name="muscleGroup"
            className="my-2 border p-2 w-1/2 border-lime-800 rounded-lg"
            style={{ color: "black" }}
            {...register("muscleGroup", { required: true })}
          >
            {state?.category.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <h1 className="text-center mb-5 text-warning">
            If your desired category isn't there, just head to the add category
            section
          </h1>
        </div>
        <span className="text-sm text-error">
          {errors?.muscleGroup?.message}
        </span>
        <input className="btn btn-accent w-full mt-6" type="submit" />
      </form>
    </div>
  );
};

export default AddPost;
