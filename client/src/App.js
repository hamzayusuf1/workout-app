import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Layout/Routes";

function App() {
  return (
    <div className="w-full mx-auto bg-workout-secondary">
      <header className="App-header">
        <RouterProvider router={router}></RouterProvider>
      </header>
    </div>
  );
}

export default App;
