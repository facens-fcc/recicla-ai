import React from 'react';
import style from './Heading.module.css';

const Heading = ({ children, level, ...props }) => {
  const Heading = `${level}`;

  return (
    <Heading className={style.heading} {...props}>
      {children}
    </Heading>
  );
};

export default Heading;
