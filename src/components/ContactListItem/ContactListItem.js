import { nanoid } from 'nanoid';
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
export default ContactListItem;
