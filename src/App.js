import "./App.css";
import contactsArr from "./contacts.json";
import { useState } from "react";

function App() {
  const [contacts, setContacts] = useState(contactsArr.slice(0, 5));

  // Add new contact function
  const addContact = () => {
    // Remanining contacts
    //* No funciona bien el filtrado de los remaining contacts y no tengo ni idea de cómo sería si no es de esta forma...
    const remainingContactsArr = contactsArr.filter(
      (eachContact) => !contacts.includes(eachContact)
    );

    // Random contact
    const randomPosition = Math.floor(
      Math.random() * remainingContactsArr.length
    );
    const randomContact = remainingContactsArr[randomPosition];

    // update "contacts" state
    setContacts([...contacts, randomContact]);
  };

  // Sort contacts by popularity function
  const sortByPopularity = () => {
    const contactsToSort = [...contacts];
    contactsToSort.sort((a, b) => b.popularity - a.popularity);

    setContacts(contactsToSort);
  };

  // Sort contacts by name function
  const sortByName = () => {
    const contactsToSort = structuredClone(contacts);
    contactsToSort.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else {
        return 1;
      }
    });

    setContacts(contactsToSort);
  };

  // Delete a contact according to its .id
  const deleteContact = (index) => {
    const copy = [...contacts];
    copy.splice(index, 1);

    setContacts(copy);
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <h1>IronContacts</h1>

      <button onClick={addContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sorty by popularity</button>
      <button onClick={sortByName}>Sort by name</button>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((eachContact, index) => {
            return (
              <tr key={eachContact.id}>
                <td>
                  <img
                    src={eachContact.pictureUrl}
                    alt={eachContact.name}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{eachContact.name}</td>
                <td>{eachContact.popularity}</td>
                <td>{eachContact.wonOscar === true ? <p>🏆</p> : ""}</td>
                <td>{eachContact.wonEmmy === true ? <p>🏆</p> : ""}</td>
                <td>
                  <button onClick={() => deleteContact(index)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
