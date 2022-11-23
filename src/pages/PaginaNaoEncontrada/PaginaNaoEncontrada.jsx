import React from 'react';
import Container from '../../components/Container/Container.jsx';
import style from './PaginaNaoEncontrada.module.css';

const PaginaNaoEncontrada = () => {
  return (
    <main className="main">
      <section className={style.hero}>
        <Container>
          <h1 className="display display--medium">Página não encontrada</h1>
          <p className={style.hero__description}>A página que você está procurando não existe.</p>
          <a className="button button--primary button--center" href="/">
            Voltar para a página inicial
          </a>
        </Container>
      </section>
    </main>
  );
};

export default PaginaNaoEncontrada;
