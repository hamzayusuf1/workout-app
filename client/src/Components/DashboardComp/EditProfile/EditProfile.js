import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { actionsTypes } from "../../../State/Actions/Actions";
import { useAppContext } from "../../../State/AppContext";
import { AuthContext } from "../../../utils/AuthProvider";

const EditProfile = () => {
  const { state, dispatch } = useAppContext();

  const { user, setUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (event) => {
    dispatch({
      type: actionsTypes.UPLOAD_PROFILE_IMAGE,
      payload: event.target.files[0],
    });
  };

  const handleUpload = async (data, event) => {
    event.preventDefault();

    if (!state?.editProfileImage) {
      toast.error("Please add an image");
      console.log("File not found");
      return;
    }

    const id = user?.user?._id;
    console.log(data);

    const formData = new FormData();
    formData.append("_id", id);

    if (data.username) {
      formData.append("username", data.username);
    }

    if (data.height) {
      formData.append("height", data.height);
    }

    if (data.weight) {
      formData.append("weight", data.weight);
    }
    if (state?.editProfileImage) {
      formData.append("image", state?.editProfileImage);
    }

    try {
      console.log(Object.fromEntries(formData));

      var object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      // var json = JSON.stringify(object);
      // console.log(json);

      fetch("https://workout-server-1meu.onrender.com/editProfile", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          if (response.message) {
            setErrorMessage(response.message);
            return;
          }
          setUser({ ...user, user: response });
          return toast.success("Updated user successfully");
        });
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
        Edit Profile
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
              Height
            </span>
          </label>
          <input
            style={{ color: "black" }}
            name=""
            {...register("height")}
            placeholder="Height"
            className="input input-bordered w-full "
          ></input>
          <span className="text-sm text-error">{errors?.weight?.message}</span>
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              Weight
            </span>
          </label>
          <input
            style={{ color: "black" }}
            name="description"
            {...register("weight")}
            placeholder="Weight"
            className="input input-bordered w-full "
          ></input>
          <span className="text-sm text-error">{errors?.weight?.message}</span>
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              Profile picture
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="file"
            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
            placeholder="Enter Image"
            onChange={handleImageChange}
            className="input input-bordered w-full py-2 "
          />
        </div>

        <input className="btn btn-accent w-full mt-6" type="submit" />
        {errorMessage && <h4 className="text-error">{errorMessage}</h4>}
      </form>
    </div>
  );
};

export default EditProfile;
