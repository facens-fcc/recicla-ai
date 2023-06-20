import style from './Header.module.css';

import Nav from '../Nav/Nav';

const Header = () => {
  return (
    <header className={style.header}>
      <div className="container">
        <Nav />
      </div>
    </header>
  );
};

export default Header;
