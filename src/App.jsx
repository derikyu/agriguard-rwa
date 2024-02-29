import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Signin from "./pages/Signin";
import FarmerData from "./pages/farmerdata/FarmerData";
import About from "./pages/About";
import Form from "./pages/Form";
import Dashboard from "./pages/Dashboard";
import Root from "./pages/routes/root";
import ErrorPage from "./error-page";
import Home from "./pages/routes/home";
import MyFirstForm from "./pages/MyFirstForm";
import Farmer from "../src/pages/Farmer";
import Farm from "../src/pages/Farm";
import Profile from "../src/pages/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/formdata",
          element: <Form />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/farmer",
          element: <Farmer />,
        },
        {
          path: "/farm",
          element: <Farm />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
