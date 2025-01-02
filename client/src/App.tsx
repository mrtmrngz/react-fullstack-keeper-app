import {createBrowserRouter, RouterProvider} from "react-router";
import { ToastContainer } from 'react-toastify';
import MainLayout from "./Layout/MainLayout.tsx";
import Home from "./pages/Home/Home.tsx";
import MarkedMessages from "./pages/MarkedMessages/MarkedMessages.tsx";
import UpdateUserPage from "./pages/UpdateProfile/UpdateProfile.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import ReadNote from "./pages/Read/ReadNote.tsx";
import Login from "./pages/auth/Login/Login.tsx";
import Register from "./pages/auth/Register/Register.tsx";
import ProtectedRoutes from "./libs/ProtectedRoutes.tsx";

const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoutes />,
      children: [
          {
              path: "",
              element: <MainLayout />,
              children: [
                  {
                      path: "",
                      element: <Home />
                  },
                  {
                      path: "marked-notes",
                      element: <MarkedMessages />
                  },
                  {
                      path: "read/:id",
                      element: <ReadNote />
                  },
                  {
                      path: "profile",
                      element: <Profile />
                  },
                  {
                      path: "profile/update/:id",
                      element: <UpdateUserPage />
                  }

              ]
          }
      ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
])

const App = () => {
    return <>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={2000} pauseOnHover={false} />
    </>
};

export default App;