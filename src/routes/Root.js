// Root.js
import { Outlet, NavLink, useLoaderData, Form, redirect } from "react-router-dom";
import { getContacts, createContact } from "../features/Contacts";
import { useEffect, useState } from "react";
import "./Root.css"; // Import the CSS file


export async function loader(){
  const contacts = await getContacts();
  return {contacts};
}
export async function action(){
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const {contacts} = useLoaderData();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
        
          <Form method="post">
            <button type="submit" >New</button>
          </Form>
        </div>
        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            Home
          </NavLink>
          <NavLink
            to="/mock"
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            Mock
          </NavLink>
          <NavLink
            to="/blocker"
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            Blocker
          </NavLink>
          <NavLink
            to="/use"
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            Use
          </NavLink>

          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {contact.favorite && <span>★</span>}
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
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
