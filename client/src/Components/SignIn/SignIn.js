import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { loginUser } from "../../utils/API.js";
import Auth from "../../utils/AuthContext";
import "./SignIn.css";
import { useAppContext } from "../../State/AppContext.js";

const SignIn = () => {
  const { userData, setUserData } = useAppContext();

  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleToken = () => {};

  const handleLogin = async (data, event) => {
    event.preventDefault();
    // fetch("http://localhost:5008/user/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.message) {
    //       // Auth.login(data?.token);
    //       console.log(data.message);
    //       setErrorMessage(data.message);

    //       return;

    //       //TODO!!!!!!-ADD THE ERROR MESSAGE TO SHOW WITH ERROR FROM THE BACKEND
    //     }

    //     console.log(data);
    //     localStorage.setItem("id_token", data.token);
    //     navigate("/");
    //   });
    // .catch((err) => {
    //   console.log(err);
    // });

    // console.log(response.json());

    try {
      const response = await loginUser(data);

      if (!response.ok) {
        return await response.json().then((res) => {
          setErrorMessage(res.message);
        });
      }

      const correctData = await response.json();

      setUserData(correctData.user);
      Auth.login(correctData.token);
      navigate("/");
    } catch (error) {}

    // navigate("/");
  };
  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center text-workout-primary">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text" style={{ color: "white" }}>
                Email
              </span>
            </label>
            <input
              type="text"
              {...register("email", { required: "Email address is required" })}
              className="input input-bordered w-full max-w-xs"
              style={{ color: "black" }}
            />
            {errors.email && (
              <p className="text-red-600 error text-sm">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text" style={{ color: "white" }}>
                Password
              </span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be longer than 6 characters",
                },
              })}
              style={{ color: "black" }}
              className="input input-bordered w-full max-w-xs"
            />

            {/* {errors.password && (
              <p className="text-white">{errors.password?.message}</p>
            )} */}
            <span className="error text-sm text-red-700">
              {errors?.password?.message}
            </span>
          </div>
          <button
            className="btn bg-workout-primary text-neutral-50 w-full mt-6"
            value="Login"
            type="submit"
          >
            Login
          </button>
          <div></div>
        </form>
        <p style={{ color: "white" }} className="mt-4">
          New to our site?{" "}
          <Link className="text-warning" to="/user/register">
            Create your new account
          </Link>
          {errorMessage && <h4 className="error">{errorMessage}</h4>}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
