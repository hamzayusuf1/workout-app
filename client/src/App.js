import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Layout/Routes";
import { AppContextProvider } from "./State/AppContext";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="w-full mx-auto bg-workout-tertiary">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Workout App</title>
        <link rel="canonical" href="https://exercisemadesimple.netlify.app/" />
      </Helmet>
      <AppContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
      </AppContextProvider>
    </div>
  );
}

export default App;
