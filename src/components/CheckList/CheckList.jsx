import React from 'react';
import style from './CheckList.module.css';

const CheckList = ({ children, color, layout }) => {
  return <ul className={`${style.checklist} ${style[`checklist--${color}`]} ${layout ? style[`checklist--${layout}`] : ''}`}>{children}</ul>;
};

CheckList.Item = ({ children }) => {
  return <li className={style.checklist__item}>{children}</li>;
};

export default CheckList;
