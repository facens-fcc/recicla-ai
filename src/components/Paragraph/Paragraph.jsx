import React from 'react';
import style from './Paragraph.module.css';

const Paragraph = ({ children, size, color }) => {
  return <div className={`${style.paragraph} ${size ? style[`paragraph--${size}`] : ''} ${color ? style[`paragraph--${color}`] : ''}`}>{children}</div>;
};

export default Paragraph;
