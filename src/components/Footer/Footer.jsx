import React from 'react';
import style from './Footer.module.css';

import Brand from '../Brand/Brand';
import Container from '../Container/Container';

const Footer = () => {
  const isHomePage = window.location.pathname === '/';

  return (
    <footer className={`${style.footer} ${isHomePage ? style.dark : ''}`}>
      <Container variant="narrow">
        <div className={style.wrapper}>
          <Brand />
          <div className={style.content}>
            <p>A Recicla Aí nasceu com intuito de oferecer informações confiáveis e atualizadas sobre locais de descarte de lixo eletrônico na cidade de Sorocaba, a fim de diminuir o acúmulo de lixo e a poluição do meio ambiente. Venha mudar o mundo com a gente!</p>
            <p>Todos os direitos reservados.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
