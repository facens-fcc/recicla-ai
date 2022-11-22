import React from 'react';
import style from './Checkbox.module.css';

const Checkbox = ({ id, label, name, checked, onChange }) => {
  return (
    <div className={style.checkbox}>
      <input className={`${style.checkbox__input} visually-hidden`} type="checkbox" name={name} id={id} onChange={onChange} checked={checked} />
      <div className={style.checkbox__mark}></div>
      <label className={style.checkbox__label} htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
