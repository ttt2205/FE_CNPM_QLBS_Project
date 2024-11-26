import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/admin/error-page";
import Index from "../components/admin/index";
import PrivateRoute from "./PrivateRoute";
import AuthProvider from "../context/AuthContext";
import LoginAdmin from "./LoginAdmin";
import LoginPage from "./LoginPage";
import RegisterForm from "./RegisterForm";
import CustomerOrders from "./CustomerOrders";
import Home from "./Home";
import CustomerProfile from "components/user/CustomerProfile";
import HomePage from "components/user/HomePageUser";
import UserProfile from "components/admin/UserProfile";
import Dashboard from "components/admin/Dashboard";
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
import AccountPanel, {
  loader as accountsLoader,
} from "components/admin/AccountPanel";
import ThongKe from "components/admin/thongke/index";
import SoLuongNhapChart from "components/admin/charts/SoLuongNhapChart";
import LuotTruyCapChart from "components/admin/charts/LuotTruyCapChart";
import OderConfirmation, {
  loader as oderConfirmationLoader,
} from "components/admin/OderConfirmation";

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
                    path: "purchase",
                    element: <NhapHangPanel />,
                    loader: nhapHangLoader,
                    errorElement: <ErrorPage />,
                  },
                  {
                    path: "purchase/read/:receiptId",
                    element: <ChiTietPhieuNhap />,
                    loader: phieuNhapLoader,
                    errorElement: <ErrorPage />,
                  },
                  {
                    path: "purchase/create",
                    loader: themPhieuNhapLoader,
                    action: createPhieuNhapAction,
                    element: <ThemPhieuNhap />,
                    errorElement: <ErrorPage />,
                  },
                  {
                    path: "sales",
                    element: <div>Sales</div>,
                    errorElement: <ErrorPage />,
                  },
                  {
                    path: "thongke",
                    element: <ThongKe />,
                    errorElement: <ErrorPage />,
                    children: [
                      {
                        element: <div>Thong ke page</div>,
                        index: true,
                      },
                      {
                        path: "0",
                        element: <SoLuongNhapChart />,
                      },
                      {
                        path: "1",
                        element: <div>So luong ban</div>,
                      },
                      {
                        path: "2",
                        element: <div>Doanh thu</div>,
                        index: true,
                      },
                      {
                        path: "3",
                        element: <LuotTruyCapChart />,
                      },
                    ],
                  },
                  {
                    path: "accounts",
                    element: <AccountPanel />,
                    loader: accountsLoader,
                    errorElement: <ErrorPage />,
                  },
                  {
                    path: "order-confirmation",
                    element: <OderConfirmation />,
                    loader: oderConfirmationLoader,
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
        path: "/user-login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
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
            element: <CustomerProfile />,
          },
          {
            path: "detail-product/:productId/:productName",
            element: <DetailProductPage />,
          },
          {
            path: "cart",
            element: <ShoppingCart />,
          },
          {
            path: "order-status",
            element: <CustomerOrders />,
          },
          {
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
