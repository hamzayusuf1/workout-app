export const loginUser = (userData) => {
  return fetch("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const signupUser = (userData) => {
  return fetch("/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const getAllPosts = () => {
  return (
    fetch("/workout/getAllPosts"),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
