export const loginUser = (userData) => {
  return fetch("https://workout-server-1meu.onrender.com/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const signupUser = (userData) => {
  return fetch("https://workout-server-1meu.onrender.com/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const getAllPosts = () => {
  return (
    fetch("https://workout-server-1meu.onrender.com/workout/getAllPosts"),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const addPost = (postData) => {
  return fetch("https://workout-server-1meu.onrender.com/addPost", {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      // "Content-Length": postData.getLengthSync(),
    },
    body: postData,
  });
};

export const editProfile = (userDetails) => {
  return fetch("https://workout-server-1meu.onrender.com/user/userUpdate", {
    method: "PUT",
    body: userDetails,
  });
};

export const addCateogryReq = (category) => {
  return fetch("https://workout-server-1meu.onrender.com/workout/addCategory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
  });
};

export const saveWorkout = (workoutData) => {
  return fetch("https://workout-server-1meu.onrender.com/workout/saveWorkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workoutData),
  });
};
