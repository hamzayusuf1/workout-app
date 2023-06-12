//still deciding if this should be accessed from the dashboard secton or the main page

import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { addCateogryReq } from "../../../utils/API";

const AddCategory = () => {
  const [category, setCategory] = useState("");

  const handleAddCategory = async (event) => {
    event.preventDefault();
    try {
      const response = await addCateogryReq(category);
      console.log(response);
      if (response.status === 401) {
        toast.error("Category already exists");
      }
      toast.success("Added Category Successfully");
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div>
      <input
        style={{ color: "black" }}
        type="text"
        name="category"
        placeholder="Please add a Category "
        className="input input-bordered input-success w-full max-w-xs"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      ></input>
      <button
        className="btn btn-outline bg-workout-primary text-workout-secondary mx-auto mt-6"
        onClick={handleAddCategory}
      >
        {" "}
        Add Category
      </button>
    </div>
  );
};

export default AddCategory;
