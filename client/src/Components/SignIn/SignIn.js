import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../Auth/AuthContext";

const SignIn = () => {
  const handleLogin = (data) => {
    fetch("http://localhost:5007/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Auth.login(data.token);
        }
      });
  };
  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center text-workout-primary">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text" style={{ color: "white" }}>
                Email
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              style={{ color: "black" }}
            />
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
              style={{ color: "black" }}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <input
            className="btn bg-workout-primary text-neutral-50 w-full mt-6"
            value="Login"
            type="submit"
          />
          <div></div>
        </form>
        <p style={{ color: "white" }} className="mt-4">
          New to our site?{" "}
          <Link className="text-warning" to="/Register">
            Create your new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
