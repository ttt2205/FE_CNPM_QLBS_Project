import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navName = [
    "Số lượng nhập",
    "Số lượng bán",
    "Doanh thu",
    "Lượt truy cập",
  ];
  return (
    <>
      <nav className="w-100 d-flex flex-column">
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          {navName.map((name, index) => (
            <div className="nav-item">
              <NavLink
                to={`${index}`}
                className="nav-link text-dark"
                activeClassName="active"
              >
                {name}
              </NavLink>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
