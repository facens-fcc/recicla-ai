import { useRef, useEffect, useState } from 'react';
import style from './MultipleCheckbox.module.css';

const MultipleCheckbox = ({ id, label, children }) => {
  const ref = useRef();
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  const handleClickOutside = ({ target }) => {
    if (ref.current && !ref.current.contains(target)) {
      setOpen(false);
    }
  };

  const handleEscape = ({ key }) => {
    if (key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="field" ref={ref}>
      <p className="label">O que deseja descartar?</p>
      <button className={`${style.multipleCheckbox} input`} id={`${id}-button`} type="button" onClick={handleClick} aria-expanded={isOpen} aria-controls={`${id}-dialog`}>
        {label}
      </button>
      <div className={style.multipleCheckboxDialog} id={`${id}-dialog`} role="dialog" aria-hidden={!isOpen} aria-labelledby={`${id}-button`}>
        {children}
      </div>
    </div>
  );
};

export default MultipleCheckbox;
