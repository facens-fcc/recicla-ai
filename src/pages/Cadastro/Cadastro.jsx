import { useForm } from '@formcarry/react';

import style from './Cadastro.module.css';

import Input from '../../components/Input/Input.jsx';
import Select from '../../components/Select/Select.jsx';
import Button from '../../components/Button/Button.jsx';
import Checkbox from '../../components/Checkbox/Checkbox.jsx';

const Cadastro = ({ categories }) => {
  const { state, submit } = useForm({
    id: 'LLqDGGwLmq',
  });

  if (state.submitted) {
    window.location.href = '/envio-confirmado/';
  }

  return (
    <main className="main">
      <section className={style.cadastro}>
        <div className="container container--compact">
          <div className="stack-md">
            <h1 className="display display--medium">Cadastro para empresas</h1>
            <p>A Recicla Aí surgiu com a missão de facilitar o processo de descarte consciente de lixo eletrônico na cidade de Sorocaba. Quer embarcar nessa jornada com a gente?</p>
            <form className="form" method="post" onSubmit={submit}>
              <Input id="name" name="Nome" label="Nome" type="text" placeholder="Digite seu nome" required />
              <Input id="email" name="E-mail" label="E-mail" type="email" placeholder="Digite seu e-mail" required />
              <Input id="company" name="Empresa" label="Empresa" type="text" placeholder="Recicla Aí" required />
              <Input id="zipcode" name="CEP" label="CEP" type="text" placeholder="00000-000" required />
              <Input id="street" name="Logradouro" label="Logradouro" type="text" placeholder="Rua Afonso Vergueiro" required />
              <Input id="street" name="Número" label="Número" type="number" placeholder="123" required />
              <Input id="street" name="Bairro" label="Bairro" type="text" placeholder="Centro" required />
              <Input id="phone" name="Telefone" label="Telefone" type="tel" placeholder="(15) 90000-0000" required />
              <Input id="phone" name="WhatsApp" label="WhatsApp" type="tel" placeholder="(15) 90000-0000" />
              <Select id="subject" name="Oferece pagamento em troca do lixo descartado?" label="Oferece pagamento em troca do lixo descartado?" options={['Sim', 'Não', 'Depende da quantidade e do tipo']} required />
              <Select id="subject" name="Retira o lixo em residência?" label="Retira o lixo em residência?" options={['Sim', 'Não', 'Depende da distância']} required />
              <fieldset className="fieldset stack-sm">
                <legend className="heading">Tipos de materiais que a empresa coleta:</legend>
                {categories.map(({ id, label, icon }) => (
                  <Checkbox key={id} id={id} name={label} label={label} icon={icon} />
                ))}
              </fieldset>
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

export default Cadastro;
