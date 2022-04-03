import { useState } from 'react';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';

export default function ContactForm({ onAdd, onCheckUnique }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'number':
        setNumber(value);
        break;
      case 'name':
        setName(value);
        break;
      default:
        return;
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    const isValidatedForm = validateForm();
    if (!isValidatedForm) return;
    onAdd({ id: nanoid(), name, number });
    reset();
  };

  const validateForm = () => {
    if (!name || !number) {
      alert('Same field is ampty ');
      return false;
    }
    return onCheckUnique(name);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <form className={s.Form} onSubmit={handleFormSubmit}>
      <label htmlFor={nanoid()}>
        Name
        <input
          className={s.Form__input}
          value={name}
          onChange={handleChangeForm}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={nanoid()}
        />
      </label>
      <label htmlFor={nanoid()}>
        Number
        <input
          className={s.Form__input}
          value={number}
          onChange={handleChangeForm}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id={nanoid()}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
}
