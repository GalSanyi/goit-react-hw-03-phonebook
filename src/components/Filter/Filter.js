import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

export default function Filter({ filter, onChange }) {
  return (
    <label className={s.Filter} htmlFor={nanoid()}>
      Find contacts by name
      <input
        className={s.Filter__input}
        type="text"
        name="filter"
        value={filter}
        onChange={({ target }) => onChange(target.value)}
        id={nanoid()}
      />
    </label>
  );
}
Filter.prototype = {
  filter: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ),
};
