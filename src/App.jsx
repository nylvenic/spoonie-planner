import Deleted from "./pages/Home.jsx";
import Completed from "./pages/Completed.jsx";
import Settings from './pages/Settings.jsx';
import Home from "./pages/Home.jsx";
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
      <Home></Home>
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