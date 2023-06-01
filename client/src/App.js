import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Layout/Routes";

function App() {
  return (
    <div className="w-full mx-auto bg-workout-tertiary">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
