import Deleted from "./pages/Deleted.jsx";
import Completed from "./pages/Completed.jsx";
import Settings from './pages/Settings.jsx';
import Today from "./pages/Today.jsx";
import Login from "./pages/Login.jsx";
import Index from "./pages/Index.jsx";
import SignUp from "./pages/SignUp.jsx";
import Inbox from './pages/Inbox.jsx';
import Todo from './pages/Todo.jsx';
import ChangeNickname from "./pages/options/ChangeNickname.jsx";
import ChangePassword from "./pages/options/ChangePassword.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ChangeAvatar from "./pages/options/ChangeAvatar.jsx";
import ChangeMaxSpoons from "./pages/options/ChangeMaxSpoons.jsx";
import BrowserReminder from "./pages/options/BrowserReminder.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Index></Index>
    ),
  },
  {
    path: "/inbox",
    element: (
      <Inbox></Inbox>
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
    path: "/settings/change-browser-reminders", // Nested path
    element: <BrowserReminder />
  },
  {
    path: "/settings/change-max-spoons", // Nested path
    element: <ChangeMaxSpoons />
  },
  {
    path: "/settings/change-avatar", // Nested path
    element: <ChangeAvatar />
  },
  {
    path: "/settings/change-nickname", // Nested path
    element: <ChangeNickname />
  },
  {
    path: "/settings/change-password", // Nested path
    element: <ChangePassword />
  },
  {
    path: "/settings",
    element: (
      <Settings></Settings>
    )
  },
  {
    path: "/todos/:id",
    element: (
      <Todo></Todo>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}