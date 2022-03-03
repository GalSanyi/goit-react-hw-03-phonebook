import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const ContactListItem = ({ id, name, number, onRemove }) => {
  return (
    <li className={s.Contact__list} id={nanoid()}>
      {name}:{number}
      <button className={s.Contact__list__button} onClick={() => onRemove(id)}>
        delete
      </button>
    </li>
  );
};
const ContactList = ({ contacts, onRemove }) => {
  if (contacts.length === 0) return null;
  return (
    <ul>
      {contacts.map(contact => (
        <ContactListItem {...contact} onRemove={onRemove} />
      ))}
    </ul>
  );
};

ContactList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }).isRequired
  ),
};

export default ContactList;
