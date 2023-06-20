import React from 'react';
import style from './Home.module.css';

import Search from '../../components/Search/Search.jsx';

import earth from '../../assets/earth.png';
import earthDesktop from '../../assets/earth-desktop.png';
import Marquee from '../../components/Marquee/Marquee.jsx';

const Home = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  userCoordinates,
  setUserCoordinates,
  userZipCode,
  setUserZipCode,
}) => {
  return (
    <main className="main">
      <section className={style.hero}>
        <div className="container">
          <h1 className={`display display--small ${style.hero__title}`}>
            Descarte o seu <em>lixo eletrônico</em> de forma consciente em{' '}
            <em>Sorocaba</em>
          </h1>
          <Search
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            userCoordinates={userCoordinates}
            setUserCoordinates={setUserCoordinates}
            userZipCode={userZipCode}
            setUserZipCode={setUserZipCode}
          />
        </div>
      </section>

      <Marquee />

      <section className={style.whyRecycle} id="por-que-reciclar">
        <figure className={style.whyRecycle__quote}>
          <blockquote className={`${style.whyRecycle__quote__content} display display--medium`} cite="https://www.theworldcounts.com/challenges/waste/electronic-waste-facts">
            Mais de <span className="hightlight">80%</span> do lixo eletrônico e eletrodométisco não é reciclado
          </blockquote>
          <figcaption className={style.whyRecycle__quote__source}>
            —<cite>World Economic Forum</cite>
          </figcaption>
        </figure>
      </section>

      <section className={style.worldCount}>
        <figure className={style.worldCount__quote}>
          <blockquote className={style.quote__content} cite="https://www.theworldcounts.com/challenges/waste/electronic-waste-facts">
            <p className={`${style.worldCount__quote__title} display display--medium`}>Por ano, toneladas de lixo eletrônico são jogadas fora no mundo todo</p>
            <p className={`${style.worldCount__quote__text} display display--medium`}>...mais precisamente</p>
            <p className={`${style.worldCount__quote__number} display display--large`}>50.000.000t</p>
          </blockquote>
          <figcaption className={style.worldCount__quote__source}>
            <cite>— Fonte: The World Counts</cite>
          </figcaption>
        </figure>
        <div className={style.worldCount__earth}>
          <picture>
            <source media="(min-width: 768px)" srcSet={earthDesktop} />
            <img className={style.worldCount__earth__image} src={earth} alt="Imagem do planeta Terra" loading="lazy" />
          </picture>
          <p className={`${style.worldCount__earth__text} display display--medium`}>A mudança começa com você</p>
        </div>
      </section>

      <section className={style.benefits}>
        <div className="container container--compact">
          <ul className={`${style.benefits__list} checklist checklist--orange`}>
            <li className={style.benefits__item}>
              <h2 className="heading">Salve o meio ambiente</h2>
              <p className={style.benefits__item__description}>Reduzindo a extracão de matéria-prima para utilização nas indústrias.</p>
            </li>
            <li className={style.benefits__item}>
              <h2 className="heading">Salve dinheiro</h2>
              <p className={style.benefits__item__description}>Promovendo a ecônomia</p>
            </li>
            <li className={style.benefits__item}>
              <h2 className="heading">Salve espaço</h2>
              <p className={style.benefits__item__description}>Conservando recursos e energia</p>
            </li>
            <li className={style.benefits__item}>
              <h2 className="heading">Salve vidas</h2>
              <p className={style.benefits__item__description}>Evitando a contaminação</p>
            </li>
            <li className={style.benefits__item}>
              <h2 className="heading">Salve o futuro</h2>
              <p className={style.benefits__item__description}>Preservando o planeta</p>
            </li>
            <li className={style.benefits__item}>
              <h2 className="heading">Beneficie a sua comunidade</h2>
              <p className={style.benefits__item__description}>Contribuindo para o bem-estar</p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
