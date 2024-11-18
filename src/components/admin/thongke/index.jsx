import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function ThongKe() {
  return (
    <div className="w-100 bg-light">
      <Navbar />
      <Outlet />
    </div>
  );
}
