import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Layout/Routes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router}></RouterProvider>
      </header>
    </div>
  );
}

export default App;
