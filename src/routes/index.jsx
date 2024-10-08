import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./admin/error-page";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./admin/contact";
import Root, { loader as rootLoader, action as rootAction } from "./admin/root";
import EditContact, { action as editAction } from "./admin/edit";
import { action as destroyAction } from "./admin/destroy";
import Index from "./admin/index";
// import LoginAdmin from "./admin/LoginAdmin";
import PrivateRoute from "./PrivateRoute";
import AuthProvider from "../context/AuthContext";
import Login from "../components/login";

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        path: "/admin",
        element: <PrivateRoute />,
        children: [
          {
            path: "dashboard",
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
        path: "/admin/login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/",
    element: <div>Home page</div>,
  },
]);

export default router;
