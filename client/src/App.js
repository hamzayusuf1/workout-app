import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Layout/Routes";
import { AppContextProvider } from "./State/AppContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="w-full mx-auto bg-workout-tertiary">
      <AppContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
      </AppContextProvider>
    </div>
  );
}

export default App;
