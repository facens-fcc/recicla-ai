import React from 'react';
import style from './Stack.module.css';

const Stack = ({ size, children }) => {
  return <div className={`${style.stack} ${style[`stack--${size}`]}`}>{children}</div>;
};

export default Stack;
