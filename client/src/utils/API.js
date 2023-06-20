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

export const addPost = (postData) => {
  return fetch("/addPost", {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      // "Content-Length": postData.getLengthSync(),
    },
    body: postData,
  });
};

export const editProfile = (userDetails) => {
  return fetch("/user/userUpdate", {
    method: "PUT",
    body: userDetails,
  });
};

export const addCateogryReq = (category) => {
  return fetch("/workout/addCategory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
  });
};

export const saveWorkout = (workoutData, token) => {
  return fetch("/workout/saveWorkout", {
    method: "POST",
    headers: {
      authorization: `Bearer: ${token}`,
    },
    body: workoutData,
  });
};
