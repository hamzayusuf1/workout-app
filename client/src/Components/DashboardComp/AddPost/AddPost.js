import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useAppContext } from "../../../State/AppContext";
import { addPost } from "../../../utils/API";

const AddPost = () => {
  const { userData } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpload = async (data, event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("email", userData?.email);
    formData.append("title", data.title);
    formData.append("description", data.description);

    try {
      console.log(Object.fromEntries(formData));

      var object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      console.log(json);

      const response = await addPost(json);
      console.log(response);
      if (!response.ok) {
        return await response.json().then((res) => {
          // setErrorMessage(res.message);
          console.log(res.statusText);
        });
      }
      const newWorkout = await response.json();

      // return toast.success("Add post successfully");
      console.log(response);
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
            {...register("firstName", {
              required: "A Name is required",
            })}
            placeholder="Enter Your Name"
            className="input input-bordered w-full "
          />
          <span className="text-sm text-error">
            {errors?.firstName?.message}
          </span>
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              Post Title
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
              Post Description
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
              Post Image
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="file"
            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
            placeholder="Enter Image"
            className="input input-bordered w-full py-2 "
          />
        </div>

        <input className="btn btn-accent w-full mt-6" type="submit" />
      </form>
    </div>
  );
};

export default AddPost;
