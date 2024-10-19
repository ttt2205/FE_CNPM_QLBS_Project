/*
 *Admin Dashboard
 *
 */
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
  useLocation,
} from "react-router-dom";
import { getContacts, createContact } from "../../services/contacts";
import { useEffect, useState } from "react";
import "../../assets/scss/admin.scss";
import LogoutButton from "../LogoutButton";
import UserProfile from "./UserProfile";

export async function loader({ request }) {
  // const url = new URL(request.url);
  // const q = url.searchParams.get("q");
  // const contacts = await getContacts(q);
  return null;
}

export async function action() {
  const contact = await createContact();
  return redirect(`/dashboard/contacts/${contact.id}/edit`);
}

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
    link: "analytics",
  },
];

export default function Root() {
  // const { contacts, q } = useLoaderData();
  const navigation = useNavigation(); //use to get location and state
  const submit = useSubmit();
  const location = useLocation();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

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
                    to={`${nav.link}${location.search}`}
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
