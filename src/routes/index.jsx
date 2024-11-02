import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/admin/error-page";
import Index from "../components/admin/index";
import PrivateRoute from "./PrivateRoute";
import AuthProvider from "../context/AuthContext";
import LoginAdmin from "./LoginAdmin";
import Home from "./Home";
import HomePage from "components/user/HomePageUser";
import UserProfile from "components/admin/UserProfile";
import Dashboard, {
  loader as rootLoader,
  action as rootAction,
} from "components/admin/Dashboard";
import ProductPanel from "components/admin/ProductPanel"; // loader as productLoader,
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction,
} from "components/admin/EditProduct";
import AddProduct, {
  loader as addProductLoader,
  action as addProductAction,
} from "components/admin/AddProduct";
import NhapHangPanel, {
  loader as nhapHangLoader,
} from "components/admin/NhapHangPanel";
import ChiTietPhieuNhap, {
  loader as phieuNhapLoader,
} from "components/admin/ChiTietPhieuNhap";
import ThemPhieuNhap, {
  loader as themPhieuNhapLoader,
  action as createPhieuNhapAction,
} from "components/admin/ThemPhieuNhap";

import DetailProductPage from "./DetailProductPage";
import ShoppingCart from "./ShoppingCart";
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
                  },
                  {
                    path: "products/edit/:productId",
                    element: <EditProduct />,
                    errorElement: <ErrorPage />,
                    loader: editProductLoader,
                    action: editProductAction,
                  },
                  {
                    path: "products/add",
                    element: <AddProduct />,
                    errorElement: <ErrorPage />,
                    loader: addProductLoader,
                    action: addProductAction,
                  },
                  {
                    path: "sales",
                    element: <NhapHangPanel />,
                    loader: nhapHangLoader,
                    errorElement: <ErrorPage />,
                  },
                  {
                    path: "sales/read/:receiptId",
                    element: <ChiTietPhieuNhap />,
                    loader: phieuNhapLoader,
                    errorElement: <ErrorPage />,
                  },
                  {
                    path: "sales/create",
                    loader: themPhieuNhapLoader,
                    action: createPhieuNhapAction,
                    element: <ThemPhieuNhap />,
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
