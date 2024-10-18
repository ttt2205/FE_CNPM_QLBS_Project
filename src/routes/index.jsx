import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/admin/error-page";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "../components/admin/contact";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "../components/admin/root";
import EditContact, { action as editAction } from "../components/admin/edit";
import { action as destroyAction } from "../components/admin/destroy";
import Index from "../components/admin/index";
// import LoginAdmin from "./admin/LoginAdmin";
import PrivateRoute from "./PrivateRoute";
import AuthProvider from "../context/AuthContext";
import Login from "../components/login";
import LoginAdmin from "./LoginAdmin";
import Home from "./Home";
import HomePage from "components/user/HomePageUser";
import UserProfile from "components/admin/UserProfile";
import ShoppingTrends from "components/user/ShoppingTrends";
const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute />,
        errorElement: <ErrorPage />,
        children: [
          {
            element: <Root />,
            errorElement: <ErrorPage />,
            loader: rootLoader,
            action: rootAction,
            children: [
              {
                errorElement: <ErrorPage />,
                children: [
                  {
                    index: true,
                    element: <Index />,
                  },
                  {
                    path: "contacts/:contactId",
                    element: <Contact />,
                    loader: contactLoader,
                    action: contactAction,
                  },
                  {
                    path: "contacts/:contactId/edit",
                    element: <EditContact />,
                    loader: contactLoader, //editLoader same as contactLoader
                    action: editAction,
                  },
                  {
                    path: "contacts/:contactId/destroy",
                    action: destroyAction,
                    errorElement: <div>Oops! There was an error.</div>,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "/login",
        element: <LoginAdmin />,
      },
      {
        path: "/",
        element: <Home />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "profile",
            //dang xai tam cua admin, sau nay thi tao cai khac va dung loader de tai du lieu
            element: <UserProfile />,
          },
          {
            path: "shopping-trends",
            element: <ShoppingTrends />,
          }
        ],
      },
    ],
  },
]);

export default router;
