import { useForm } from '@formcarry/react';

import style from './Contato.module.css';

import Input from '../../components/Input/Input.jsx';
import Select from '../../components/Select/Select.jsx';
import Button from '../../components/Button/Button.jsx';

const Contato = () => {
  const { state, submit } = useForm({
    id: 'LLqDGGwLmq',
  });

  if (state.submitted) {
    window.location.href = '/envio-confirmado/';
  }

  return (
    <main className="main">
      <section className={style.contato}>
        <div className="container container--compact">
          <div className="stack-md">
            <h1 className="display display--medium">Contato</h1>
            <p>
              Possui alguma dúvida, sugestão ou qualquer problema relacionado à Recicla.aí? <br /> Preencha o formulário abaixo para podermos te ajudar!
            </p>
            <form className="form" method="post" onSubmit={submit}>
              <Input id="name" name="Nome" label="Nome" type="text" placeholder="Digite seu nome" required />
              <Input id="email" name="E-mail" label="E-mail" type="email" placeholder="Digite seu e-mail" required />
              <Input id="phone" name="Telefone" label="Telefone" type="tel" placeholder="Digite seu telefone" required />
              <Select id="subject" name="Assunto" label="Assunto" options={['Dúvida', 'Sugestão', 'Suporte']} required />
              <Input id="message" name="Mensagem" label="Mensagem" type="textarea" placeholder="Digite sua mensagem" required />
              <footer>
                <Button variant="orange" type="submit">
                  Enviar
                </Button>
              </footer>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contato;
