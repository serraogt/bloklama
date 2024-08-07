// import { Form } from "react-router-dom";

/* eslint-disable no-restricted-globals */
import { useParams } from 'react-router-dom';

export default function Contact() {

  const { contactId } = useParams();
  

  const contact = {
    id: contactId,
    first: "Your",
    last: "Name",
    avatar: "https://robohash.org/you.png?size=200x200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  
  };
  console.log(contact.id)

  return (
    //routerdaki id yi neden almıyor?
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={
            // contact.avatar 
            // ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
        />
      </div>
      <div>{contact.id}</div>
      <div>
        <h1>
          {contact.first || contact.last  ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <form action="edit">
            <button type="submit">Edit</button>
          </form>
          <form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const favorite = contact.favorite;
  return (
    <form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>

    </form>
  );
}