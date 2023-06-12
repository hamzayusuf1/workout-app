import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAppContext } from "../../State/AppContext";
import { signupUser } from "../../utils/API";
import Auth from "../../utils/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const { userData, setUserData } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data, event) => {
    event.preventDefault();

    try {
      fetch("http://localhost:5008/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.message) {
            return setErrorMessage(data.message);
          }
          Auth.login(data.token);
          setUserData(data.user);
          navigate("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center pt-8">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-workout-primary">
            Signup
          </h1>
          <p className="text-sm " style={{ color: "white" }}>
            Create a new account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm"
                style={{ color: "white" }}
              >
                First name
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
                // data-temp-mail-org="0"
              />
              <span className="text-sm text-error">
                {errors?.firstName?.message}
              </span>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm"
                style={{ color: "white" }}
              >
                Last name
              </label>
              <input
                type="text"
                {...register("lastName", {
                  required: "You need to provide your last name",
                })}
                // name="name"

                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
              <span className="text-sm text-error">
                {errors?.lastName?.message}
              </span>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm"
                style={{ color: "white" }}
              >
                Email address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "You must provide an email",
                })}
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
              />
              <span className="text-sm text-error">
                {errors?.email?.message}
              </span>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm"
                  style={{ color: "white" }}
                >
                  Password
                </label>
              </div>
              <input
                required
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be longer than 6 characters",
                  },
                })}
                name="password"
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 focus:outline-green-500 text-gray-900"
              />
              <span className="text-sm text-error">
                {errors?.password?.message}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                className="w-full px-8 py-3 font-semibold rounded-md bg-workout-primary text-neutral-50 hover:bg-yellow-300 hover:border-yellow-700 border-transparent border-2"
                value="signup"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>

          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>

        <p
          className="px-6 text-sm text-center  mt-4"
          style={{ color: "white" }}
        >
          Already have an account yet?{" "}
          <Link to="/user/login" className="hover:underline text-gray-600">
            Sign In
          </Link>
          {errorMessage && (
            <h4 className="text-error font-bold text-xl">{errorMessage}</h4>
          )}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
