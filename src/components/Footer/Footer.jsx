import style from './Footer.module.css';
import Brand from '../Brand/Brand';

const Footer = () => {
  const isHomePage = window.location.pathname === '/';

  return (
    <footer className={`${style.footer} ${isHomePage && style.footerDark}`}>
      <div className="container container--narrow">
        <div className={style.footer__wrapper}>
          <Brand />
          <div className={style.footer__content}>
            <p>A Recicla Aí nasceu com intuito de oferecer informações confiáveis e atualizadas sobre locais de descarte de lixo eletrônico na cidade de Sorocaba, a fim de diminuir o acúmulo de lixo e a poluição do meio ambiente. Venha mudar o mundo com a gente!</p>
            <p>Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
