//still deciding if this should be accessed from the dashboard secton or the main page

import React from "react";

const AddCategory = () => {
  return (
    <div>
      <input
        style={{ color: "black" }}
        type="text"
        name="category"
        placeholder="Please add a Category "
        className="input input-bordered input-success w-full max-w-xs"
      ></input>
      <button className="btn btn-outline bg-workout-primary text-workout-secondary mx-auto mt-6 ">
        {" "}
        Add Category
      </button>
    </div>
  );
};

export default AddCategory;
