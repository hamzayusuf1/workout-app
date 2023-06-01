import React from "react";
import { useAppContext } from "../../../State/AppContext";

import { toast } from "react-hot-toast";

const EditProfile = () => {
  const { userData } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="m-16 w-full">
      <h1 className="text-4xl font-bold text-center my-10 mt-10 md:mt-10 lg:mt-10 ">
        Edit Profile
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
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              Wight
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="text"
            name="weight"
            placeholder="Wight"
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              height
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="text"
            name="height"
            placeholder="height"
            className="input input-bordered w-full "
          />
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              User Image
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

        <br />
        <input className="btn btn-accent w-full mt-6" type="submit" />
      </form>
    </div>
  );
};

export default EditProfile;
