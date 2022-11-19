import React, { useState, useEffect, useRef } from 'react';
import style from './Header.module.css';
import Brand from '../Brand/Brand';

const Header = () => {
  const menuRef = useRef();
  const menuToggleRef = useRef();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  /**
   * Toggle Menu state.
   */

  const handleToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  /**
   * Close Menu when pressing Escape.
   * After closing, focus on the menu toggle.
   */

  const handleEscape = ({ key }) => {
    if (key === 'Escape') {
      setIsNavbarOpen(false);
      menuToggleRef.current.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isNavbarOpen]);

  /**
   * Block scrolling when menu is open and unblock when menu is closed.
   * This is done by adding/removing the 'no-scroll' class to the body.
   */

  useEffect(() => {
    isNavbarOpen ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');
  }, [isNavbarOpen]);

  /**
   * Trap focus inside the menu when it is open.
   * When the menu is open, the focus is trapped inside the menuRef.
   */

  const handleFocus = (event) => {
    if (isNavbarOpen) {
      const focusableElements = menuRef.current.querySelectorAll('a[href], button');
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (event.target === lastFocusableElement && !event.shiftKey) {
        event.preventDefault();
        firstFocusableElement.focus();
      } else if (event.target === firstFocusableElement && event.shiftKey) {
        event.preventDefault();
        lastFocusableElement.focus();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleFocus);
    return () => document.removeEventListener('keydown', handleFocus);
  }, [isNavbarOpen]);

  return (
    <header className={style.header}>
      <div className="container">
        <nav className={style.nav} data-menu-open={isNavbarOpen} id="navbar">
          <Brand className={style.brand} />

          <div className={`${style.corner} hide-at-phone`} ref={menuRef}>
            <a className="button button--secondary button--small" href="">
              Sou empresa e quero coletar
            </a>
          </div>

          <div className={style.menu} ref={menuRef}>
            <button className={style.menuToggle} onClick={handleToggle} aria-expanded={isNavbarOpen} aria-label={isNavbarOpen ? 'Fechar menu' : 'Abrir menu'} aria-haspopup="true" type="button" ref={menuToggleRef}>
              <span className={style.menuToggleLine} />
              <span className={style.menuToggleLine} />
              <span className={style.menuToggleLine} />
            </button>
            <ul className={style.menuList} aria-label="Menu" role="menu">
              <li className={style.menuListItem}>
                <a className={`link ${style.menuListLink}`} href="/">
                  Sobre o projeto
                </a>
              </li>
              <li className={style.menuListItem}>
                <a className={`link ${style.menuListLink}`} href="/">
                  O que são lixos eletrônicos
                </a>
              </li>
              <li className={style.menuListItem}>
                <a className={`link ${style.menuListLink}`} href="/">
                  Contato
                </a>
              </li>
              <li className={style.menuListItem}>
                <a className={`link ${style.menuListLink}`} href="/">
                  Cadastre-se
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
