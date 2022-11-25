import React from 'react';
import Distance from '../Distance/Distance';

import style from './Card.module.css';

import iconEnvironment from '../../assets/environment.svg';

const Card = ({ company, userCordinates }) => {
  const { name, address, whatsapp, phone, payment, residential_collection, selective_collection } = company;

  const formatPhone = (phone) => {
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '';

    if (!cleanPhone.startsWith('0800')) {
      return `55${cleanPhone}`;
    }

    return cleanPhone;
  };

  return (
    <li className={style.card}>
      <div className={style.card__header}>
        <h3 className={`${style.card__title} heading`}>{name}</h3>
        <Distance origin={userCordinates} destination={[address.lat, address.lng]} />
        <p>
          {address.street}, {address.city}, {address.state}
        </p>
        {phone && (
          <a className="link" href={`tel:${formatPhone(phone)}`}>
            {phone}
          </a>
        )}
      </div>
      <div className={style.card__body}>
        <ul className={`${style.card__list} checklist checklist--black`}>
          {payment && <li>Possibilidade de pagamento em troca do lixo descartado</li>}
          {residential_collection && <li>Retirada em residência (a consultar)</li>}
        </ul>
      </div>
      <div className={style.card__footer}>
        <a className="link" href={`https://www.google.com/maps/search/?api=1&query=${address.lat},${address.lng}`} target="_blank" rel="noreferrer">
          <img className="icon" src={iconEnvironment} alt="Icone de localização" aria-hidden="true" />
          Ver no mapa
        </a>
        {whatsapp ? (
          <a className="button" href={`https://api.whatsapp.com/send?phone=${formatPhone(phone)}`} target="_blank" rel="noreferrer">
            Abrir WhatsApp
          </a>
        ) : (
          <a className="button" href={`tel:${formatPhone(phone)}`} target="_blank" rel="noreferrer">
            Entrar em contato
          </a>
        )}
      </div>
    </li>
  );
};

export default Card;
