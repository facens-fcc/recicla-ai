import React from 'react';
import Button from '../../components/Button/Button.jsx';
import style from './EnvioConfirmado.module.css';

const EnvioConfirmado = () => {
  return (
    <main className="main">
      <section className={style.hero}>
        <div className="container">
          <h1 className="display display--medium">Envio confirmado</h1>
          <p className={style.hero__description}>Seu contato foi enviado com sucesso! Em breve entraremos em contato.</p>
          <Button variant="orange" href="/">
            Voltar para a página inicial
          </Button>
        </div>
      </section>
    </main>
  );
};

export default EnvioConfirmado;
