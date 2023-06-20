import style from './Card.module.css';

import iconEnvironment from '../../assets/environment.svg';
import Button from '../Button/Button.jsx';

const Card = ({ company }) => {
  const { name, categories, distance, addressStreet, addressNumber, city, state, phoneLink, phoneFormatted, payment, residentialCollection, addressLink, whatsapp, whatsappLink } = company;

  return (
    <li className={style.card}>
      <div className={style.card__header}>
        <div className={style.card__company}>
          <h3 className={style.card__company__title}>{name}</h3>
          <p className={style.card__company__distance}>{distance < 1 ? `${Math.round(distance * 1000)}m` : `${Math.round(distance * 10) / 10}km`} de distância</p>
        </div>
        <div className={style.card__contact}>
          <p className={style.card__contact__address}>
            {addressStreet}, {addressNumber} | {city} / {state}
          </p>
          <a className={style.card__contact__phone} href={phoneLink} title={`Ligar para ${name}`}>
            {phoneFormatted}
          </a>
        </div>
      </div>
      <div className={style.card__body}>
        {payment && residentialCollection && (
          <ul className={`${style.card__extraInfo} checklist checklist--black`}>
            {payment && <li>Possibilidade de pagamento em troca do lixo descartado</li>}
            {residentialCollection && <li>Retirada em residência (a consultar)</li>}
          </ul>
        )}
        <div className={style.card__categories}>
          <h4 className={style.card__categories__label}>Tipos de lixo que a empresa coleta:</h4>
          <ul className={style.card__categories__list}>
            {categories.map((category) => (
              <li className={style.card__categories__item} key={category.label}>
                <figure className={style.card__categories__icon} aria-label={category.label} tabIndex="0">
                  <svg viewBox="0 0 28 28" aria-label={category.label} role="img">
                    <use href={`${category.icon}#root`} />
                  </svg>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={style.card__footer}>
        <div className={style.card__links}>
          <a className="link" href={addressLink} target="_blank" rel="noreferrer">
            <img className="icon" src={iconEnvironment} alt="Icone de localização" aria-hidden="true" />
            Ver no mapa
          </a>
        </div>
        <div className={style.card__buttons}>
          {whatsapp && (
            <Button variant="outline" href={whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp
            </Button>
          )}
          {phoneLink && (
            <Button variant="orange" href={phoneLink} target="_blank" rel="noreferrer">
              Ligar
            </Button>
          )}
        </div>
      </div>
    </li>
  );
};

export default Card;
