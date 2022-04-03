import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter/Filter';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermine Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? initialContacts;
  });
  const [filter, setFilter] = useState('');

  //!функция оброботки контактов
  const handleAddContact = newContact => {
    setContacts(prev => [...prev, newContact]);
    localStorage.setItem('contacts', JSON.stringify([...contacts, newContact]));
  };
  //!проверка уникальность контакта
  const handleCheckUnique = name => {
    const isExistContact = !!contacts.find(contact => contact.name === name);
    isExistContact && alert('is already in contacts');
    return !isExistContact;
  };

  const handleRemoveContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const handleFormChange = filter => {
    setFilter(filter);
  };
  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  useEffect(
    id => {
      localStorage.setItem(
        'contacts',
        JSON.stringify(contacts.filter(contact => contact.id !== id))
      );
    },
    [contacts]
  );

  const visibleContacts = getVisibleContacts();
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onAdd={handleAddContact} onCheckUnique={handleCheckUnique} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleFormChange} />
      <ContactList contacts={visibleContacts} onRemove={handleRemoveContact} />
    </>
  );
}
