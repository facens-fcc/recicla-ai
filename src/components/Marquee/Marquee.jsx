import style from './Marquee.module.css';

const images = [
  'marquee-antena.jpg',
  'marquee-batedeira.jpg',
  'marquee-bateria.jpg',
  'marquee-cabos-e-fios.jpg',
  'marquee-carregador.jpg',
  'marquee-celular-tablet.jpg',
  'marquee-lampada.jpg',
  'marquee-liquidificador.jpg',
  'marquee-maquina-de-lavar.jpg',
  'marquee-mouse-teclado.jpg',
  'marquee-pilha.jpg',
  'marquee-video-game.jpg',
];

const Marquee = () => {
  return (
    <section className={style.marquee}>
      <div className={style.marquee__wrapper}>
        <div className={style.marquee__group}>
          {images.map((image, index) => (
            <img key={index} className={style.marquee__image} src={`/assets/images/${image}`} alt="Imagem de lixo eletrônico" width="260" height="260" />
          ))}
        </div>
        <div className={style.marquee__group} aria-hidden="true">
          {images.map((image, index) => (
            <img key={index} className={style.marquee__image} src={`/assets/images/${image}`} alt="Imagem de lixo eletrônico" width="260" height="260" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
