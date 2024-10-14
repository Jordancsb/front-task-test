import { RouteObject } from "react-router";
import Layout from "../layout";
import Home from "../pages/Board";
import LoginScreen from "../components/SignIn";
import SignUpScreen from "../components/SignUp";
import Dashboard from "../components/Dashboard";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "board",
            element: <Dashboard />,
          }
        ],
      },
    ],
  },
  {
    path: "login",
    element: <LoginScreen />,
  },
  {
    path: "register",
    element: <SignUpScreen />,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  }
];

export default routes;
