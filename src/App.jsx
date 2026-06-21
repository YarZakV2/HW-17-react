import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

const LS_KEY = "contacts";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "id-1",
            name: "Rosie Simpson",
            number: "459-12-56",
          },
          {
            id: "id-2",
            name: "Hermione Kline",
            number: "443-89-12",
          },
          {
            id: "id-3",
            name: "Eden Clements",
            number: "645-17-79",
          },
          {
            id: "id-4",
            name: "Annie Copeland",
            number: "227-91-26",
          },
        ];
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const exists = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prev => [newContact, ...prev]);
  };

  const deleteContact = id => {
    setContacts(prev =>
      prev.filter(contact => contact.id !== id)
    );
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <ContactForm onAdd={addContact} />

      <h2>Contacts</h2>

      <Filter
        value={filter}
        onChange={setFilter}
      />

      <ContactList
        contacts={visibleContacts}
        onDelete={deleteContact}
      />
    </div>
  );
}