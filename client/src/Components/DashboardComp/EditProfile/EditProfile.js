import React from "react";
import { toast } from "react-hot-toast";

import { useAppContext } from "../../../State/AppContext";
import { actionsTypes } from "../../../State/Actions/Actions";
import { editProfile, loginUser } from "../../../utils/API";

const EditProfile = () => {
  const { userData, state, dispatch } = useAppContext();

  const handleImageChange = (event) => {
    dispatch({
      type: actionsTypes.UPLOAD_PROFILE_IMAGE,
      payload: event.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!state?.editProfileImage) {
    //   toast.error("Please add an image");
    //   console.log("File not found");
    //   return;
    // }
    // const userName = e.target.userName.value;
    // const weight = e.target.weight.value;
    // const height = e.target.height.value;
    // const id = userData?._id;

    // // console.log(
    // //   `${userName} and ${weight} and ${height} and ${id} and ${state?.editProfileImage}`
    // // );

    // console.log(state?.editProfileImage);

    // const formData = new FormData();
    // // formData.append("image", state?.image);
    // formData.append("userName", userName);
    // formData.append("weight", weight);
    // formData.append("height", height);
    // formData.append("_id", id);

    // console.log(Object.fromEntries(formData));

    // try {
    //   fetch("http://localhost:5008/user/user", {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     body: formData,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       toast.success("User updated successfully");
    //       // e.target.reset();
    //       console.log(data);
    //     });
    // } catch (error) {
    //   console.error(error);
    // }

    try {
      fetch("http://localhost:5008/upda", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: {
          email: "hamza@yusuf.com",
          password: "hamza321",
        },
      });

      // const response = await loginUser({
      //   email: "hamza@yusuf.com",
      //   password: "hamza321",
      // });

      // if (!response.ok) {
      //   return await response.json().then((res) => {
      //     console.log(res.message);
      //   });
      // }

      // const correctData = await response.json();

      // setUserData(correctData.user);
      // Auth.login(correctData.token);
      // navigate("/");
    } catch (error) {}
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
            defaultValue={userData.username}
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              Weight
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="text"
            name="weight"
            placeholder="Weight"
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              Height
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="text"
            name="height"
            placeholder="Height"
            className="input input-bordered w-full "
          />
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              Profile Image
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="file"
            // onChange={handleImageChange}
            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
            placeholder="Upload Image"
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
