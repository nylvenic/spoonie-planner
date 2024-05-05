import Deleted from "./pages/Deleted.jsx";
import Completed from "./pages/Completed.jsx";
import Settings from './pages/Settings.jsx';
import Today from "./pages/Today.jsx";
import Login from "./pages/Login.jsx";
import Index from "./pages/Index.jsx";
import SignUp from "./pages/SignUp.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Index></Index>
    ),
  },
  {
    path: "/login",
    element: (
      <Login></Login>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <SignUp></SignUp>
    ),
  },
  {
    path: "/today",
    element: (
      <Today></Today>
    ),
  },
  {
    path: "/completed",
    element: (
      <Completed></Completed>
    ),
  },
  {
    path: "/deleted",
    element: (
      <Deleted></Deleted>
    ),
  },
  {
    path: "/settings",
    element: (
      <Settings></Settings>
    ),
  },
]);

export default function App() {

  return <RouterProvider router={router}></RouterProvider>
}