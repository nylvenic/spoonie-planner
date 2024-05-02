import Home from "./pages/Home.jsx";
import Settings from './pages/Settings.jsx';
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
    path: "/settings",
    element: (
      <Settings></Settings>
    ),
  },
]);

export default function App() {

  return <RouterProvider router={router}></RouterProvider>
}