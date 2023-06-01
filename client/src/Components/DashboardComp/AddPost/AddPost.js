import React from "react";
import { useAppContext } from "../../../State/AppContext";

import { toast } from "react-hot-toast";

const AddPost = () => {
  const { userData } = useAppContext();

  const handleSubmit = async () => {
    return toast.success("Add post successfully");
  };

  return (
    <div className="m-16 w-full">
      <h1
        className="text-4xl font-bold text-center my-10 mt-10 md:mt-10 lg:mt-10  "
        style={{ color: "white" }}
      >
        Add Post
      </h1>

      <form onSubmit={handleSubmit} className="w-full">
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
            placeholder="Enter Your Name"
            defaultValue={userData.firstName}
            readOnly
            className="input input-bordered w-full "
          />
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
            name="title"
            placeholder="Post Title"
            className="input input-bordered w-full "
          />
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
            cols="30"
            rows="10"
            placeholder="Post Description"
            className="input input-bordered w-full "
          ></textarea>
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
