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

export async function loader({ request }) {
  // const url = new URL(request.url);
  // const q = url.searchParams.get("q");
  // const contacts = await getContacts(q);
  // return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/dashboard/contacts/${contact.id}/edit`);
}

export default function Root() {
  // const { contacts, q } = useLoaderData();
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
  const navigation = useNavigation();
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
        <div>
          {/* <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch, // thay the url moi nhat trong lich su thanh duong dan moi
                });
              }}
            />
            <div id="search-spinner" hidden={!searching} aria-hidden />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form> */}
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
      >
        <Outlet />
      </div>
    </>
  );
}
