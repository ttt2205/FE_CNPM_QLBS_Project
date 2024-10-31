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
import PrivateRoute from "./PrivateRoute";
import AuthProvider from "../context/AuthContext";
import LoginAdmin from "./LoginAdmin";
import Home from "./Home";
import HomePage from "components/user/HomePageUser";
import UserProfile from "components/admin/UserProfile";
import Dashboard from "components/admin/Dashboard";
import DetailProductPage from "./DetailProductPage";
import ShoppingCart from "./ShoppingCart";

import ProductPanel, {
  loader as productLoader,
} from "components/admin/ProductPanel";
import ShoppingTrends from "components/user/ShoppingTrends";
import AdvancedSearch from "context/advancedSearch";
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
            element: <Dashboard />,
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
                    path: "products",
                    element: <ProductPanel />,
                    errorElement: <ErrorPage />,
                    loader: productLoader,
                  },
                  {
                    path: "sales",
                    element: <div>Sales</div>,
                    errorElement: <ErrorPage />,
                  },
                  {
                    path: "purchase",
                    element: <div>Purchase</div>,
                    errorElement: <ErrorPage />,
                  },
                  {
                    path: "analytics",
                    element: <div>Analytic</div>,
                    errorElement: <ErrorPage />,
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
            path: "detail-product/:productId/:productName",
            element: <DetailProductPage />,
          },
          {
            path: "shopping-cart",
            element: <ShoppingCart />,
            path: "shopping-trends",
            element: <ShoppingTrends />,
          },
          {
            path: "products",
            element: <AdvancedSearch />,
          },
        ],
      },
      
    ],
  },
]);

export default router;
