/*
 *Admin Dashboard
 *
 */
import { Outlet, NavLink, useNavigation } from "react-router-dom";
import "../../assets/scss/admin.scss";
import LogoutButton from "../LogoutButton";
import UserProfile from "./UserProfile";

const navs = [
  {
    name: "Products",
    link: "products",
  },
  {
    name: "Sales",
    link: "sales",
  },
  {
    name: "Purchase",
    link: "purchase",
  },
  {
    name: "Analytics",
    link: "thongke/revenue",
  },
  {
    name: "Accounts",
    link: "accounts",
  },
];

export default function Root() {
  // const { contacts, q } = useLoaderData();
  const navigation = useNavigation(); // use to get location and state

  // useEffect(() => {
  //   document.getElementById("q").value = q;
  // }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div className="d-flex justify-content-between">
          <UserProfile />
          <LogoutButton />
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
