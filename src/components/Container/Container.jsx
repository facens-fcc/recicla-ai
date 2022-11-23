import React from 'react';
import style from './Container.module.css';

const Container = ({ variant, children }) => {
  return <div className={`${style.container} ${variant ? style[`container--${variant}`] : ''}`}>{children}</div>;
};

export default Container;
