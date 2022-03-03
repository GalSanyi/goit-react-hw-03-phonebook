import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { onAdd } = this.props;
    const isValidatedForm = this.validateForm();
    if (!isValidatedForm) return;
    onAdd({ id: nanoid(), name, number });
    this.reset();
  };

  validateForm = () => {
    const { name, number } = this.state;
    const { onCheckUnique } = this.props;
    if (!name || !number) {
      alert('Same field is ampty ');
      return false;
    }
    return onCheckUnique(name);
  };

  reset = () => {
    this.setState({
      name: ' ',
      number: ' ',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.Form} onSubmit={this.handleFormSubmit}>
        <label htmlFor={nanoid()}>
          Name
          <input
            className={s.Form__input}
            value={name}
            onChange={this.handleChangeForm}
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
            onChange={this.handleChangeForm}
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
}
