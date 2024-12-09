/*
 *Admin Dashboard
 *
 */
import { Outlet, NavLink, useNavigation, Link } from "react-router-dom";
import "../../assets/scss/admin.scss";
import LogoutButton from "../LogoutButton";
import UserProfile from "./UserProfile";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "../../context/AuthContext";

const allNavs = [
  {
    name: "Products",
    link: "products",
    icon: <i className="fa-solid fa-book"></i>,
  },
  {
    name: "Sales",
    link: "sales",
    icon: <i className="fa-solid fa-shopping-bag"></i>,
  },
  {
    name: "Purchase",
    link: "purchase",
    icon: <i className="fa-solid fa-truck"></i>,
  },
  {
    name: "Analytics",
    link: "thongke/revenue",
    icon: <i className="fa-solid fa-chart-simple"></i>,
  },
  {
    name: "Accounts",
    link: "accounts",
    icon: <i className="fa-solid fa-user"></i>,
  },
  {
    name: "Promotions",
    link: "promotions",
    icon: <i className="fa-solid fa-percent"></i>,
  },
];

export default function Root() {
  const { logOut, user } = useAuth();
  // const { contacts, q } = useLoaderData();
  const navigation = useNavigation(); // use to get location and state
  let navs = [];
  if (user.role.role_name === "Admin") {
    //chi co nav account
    navs.push({
      name: "Accounts",
      link: "accounts",
      icon: <i className="fa-solid fa-user"></i>,
    });
  } else {
    navs = allNavs.filter((nav) => nav.name !== "Accounts");
  }

  // useEffect(() => {
  //   document.getElementById("q").value = q;
  // }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div className="d-flex justify-content-between">
          <UserProfile />

          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <i className="fa-solid fa-bars text-light"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <div className="text-decoration-none" onClick={logOut}>
                  Logout
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/" className="text-decoration-none text-dark">
                  Home
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <nav>
          {navs.length ? (
            <ul>
              {navs.map((nav) => (
                <li key={nav.name}>
                  <NavLink
                    to={`${nav.link}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {nav.name}
                    {nav.icon}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>

        <a
          id="toggle-sidebar"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("sidebar").classList.toggle("collapsed");
          }}
        >
          <i class="fa-solid fa-bars"></i>
        </a>
      </div>

      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
        style={{ overflow: "auto" }}
      >
        <div className="loader"></div>
        <Outlet />
      </div>
    </>
  );
}
